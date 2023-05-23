const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let questions = [];

fetch("../data/questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    const question = questions.find((q) => q.id == id);

  //id
  document.getElementById("id").innerHTML = question.id;

  //abbr
  document.getElementById("abbr").innerHTML = question.abbr;

  //question
  document.getElementById("question").textContent = question.q;

  //notes
  document.getElementById("notes").innerHTML = question.notes;

  // Set the modifiedDateTime element's content
  const modifiedDateTimeElement = document.getElementById("modified-date-time");
  const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
  const formattedModifiedDateTime = new Date(question.modifiedDateTime).toLocaleString('en-US', options);
  modifiedDateTimeElement.textContent = "تاريخ الالتحاق: " + formattedModifiedDateTime;


//image
const url = question.screenshots;
const imageElement = document.createElement("div");
imageElement.innerHTML = `<img src="${url}" alt="" class="w3-hover-opacity" onclick="onClick(this)">`;
document.getElementById("screenshots").appendChild(imageElement.firstChild);

  //answers
  const answersContainer = document.getElementById("answers-container");

  // loop through the answers array and display each answer and its corresponding image
  for (let i = 0; i < question.answer.length; i++) {
    const answer = question.answer[i];
    const url = question.screenshots[i];
    const answerElement = document.createElement("div");
    answerElement.innerHTML = `
      <li>${answer}</li>
      <img src="${url}" alt="${answer}" class="w3-hover-opacity" onclick="onClick(this, ${i})">
    `;
    answersContainer.appendChild(answerElement);
  }

  

  
  
})
