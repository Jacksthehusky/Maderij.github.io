const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let questions = [];

fetch("../data/files.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    const question = questions.find((q) => q.id == id);


    // Answers container
    const answersContainer = document.getElementById("answers-container");

    // Loop through the answers array and display each answer and its corresponding button
    for (let i = 0; i < question.answer.length; i++) {
      const answer = question.answer[i];
      const excelUrl = question.excel[i];
      const fileType = excelUrl.split('.').pop().toLowerCase(); // Extract file type from URL

      const answerElement = document.createElement("li");
      answerElement.innerHTML = `
        ${answer}
        <button class="btns" style="float: left;" onclick="downloadFile('${excelUrl}', '${answer}.${fileType}')">Download ${fileType.toUpperCase()} File</button>
      `;
      answersContainer.appendChild(answerElement);
    }
  });
   
   // Function to handle file download
function downloadFile(fileUrl, fileName) {
  // Create an anchor element
  const link = document.createElement("a");

  // Set the href attribute of the anchor to the file URL
  link.href = fileUrl;

  // Set the download attribute to prompt the user to download the file with a specific filename
  link.download = fileName;

  // Programmatically trigger a click event on the anchor element to start the download
  link.click();
}