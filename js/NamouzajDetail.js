const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let questions = [];

fetch("../data/files.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    const question = questions.find((q) => q.id == id);

    //الاسم
    document.getElementById("name").textContent = question.name;

    //image
    const url = question.pic;
    const imageElement = document.createElement("div");
    imageElement.innerHTML = `<img src="${url}" alt="" class="w3-hover-opacity" onclick="onClick(this)">`;
    document.getElementById("pic").appendChild(imageElement.firstChild);

    // Excel download button
    const scannedUrl = question.scanned;
    const fileType = scannedUrl.split(".").pop().toLowerCase(); // Extract file type from URL

    const scannedButton = document.createElement("button");
    scannedButton.innerText = `Download ${fileType.toUpperCase()} File`;
    scannedButton.onclick = () =>
      downloadFile(scannedUrl, `${question.name}.${fileType}`);
    // Update HTML to display scanned download button
    document.getElementById("scannedUrl").innerHTML = `
<button class="btns" style="margin-top: 3rem;" onclick="downloadFile('${scannedUrl}', '${
      question.name
    }.${fileType}')">Download ${fileType.toUpperCase()} File</button>
`;
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
