const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let questions = [];

fetch("../data/questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    const question = questions.find((q) => q.id == id);

    //id
    document.getElementById("id").innerHTML = question.id + "/ب";
    //phone
    document.getElementById("phone").innerHTML = question.phone;
    //name
    document.getElementById("name").textContent = question.name;
    //address
    document.getElementById("address").innerHTML = question.address;
    //joinDate
    const joinDateElement = document.getElementById("join-date");
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    // Convert the joinDate to a Date object and format it
    const formattedJoinDate = new Date(question.joinDate).toLocaleDateString("en-US", options);

    // Update the text content of the joinDateElement
    joinDateElement.textContent = formattedJoinDate;

    //image
    const url = question.pic;
    const imageElement = document.createElement("div");
    imageElement.innerHTML = `<img src="${url}" alt="" class="w3-hover-opacity" onclick="onClick(this)">`;
    document.getElementById("pic").appendChild(imageElement.firstChild);

    //answers
    const answersContainer = document.getElementById("answers-container");
    // loop through the answers array and display each answer and its corresponding buttons
    for (let i = 0; i < question.answer.length; i++) {
      const answer = question.answer[i];
      // If the answer has associated Excel files
      if (question.excel && question.excel.length > i) {
        const excelUrl = question.excel[i];
        const answerElement = document.createElement("li");
        answerElement.innerHTML = `
             ${answer}
             <button class="btns" style="float: left;" onclick="downloadExcel('${excelUrl}', '${question.name}_${answer}')">تحميل ملف ال Excel</button>
           `;
        answersContainer.appendChild(answerElement);
      } else {
        // If there are no associated Excel files for this answer
        const answerElement = document.createElement("div");
        answerElement.innerHTML = `<li>${answer}</li>`;
        answersContainer.appendChild(answerElement);
      }
    }
  });
   
   // Function to handle Excel file download
   function downloadExcel(excelUrl, fileName) {
     // Create an anchor element
     const link = document.createElement("a");
   
     // Set the href attribute of the anchor to the Excel file URL
     link.href = excelUrl;
   
     // Set the download attribute to prompt the user to download the file with a specific filename
     link.download = `${fileName}.xlsx`;
   
     // Programmatically trigger a click event on the anchor element to start the download
     link.click();
   }