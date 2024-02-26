/// Function to encode string to Base64 using UTF-8
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// Function to decode Base64-encoded string using UTF-8
function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}
// script.js
document.getElementById("addForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = new FormData(this);

  // Convert form data to JSON object
  const jsonObject = {};
  formData.forEach((value, key) => {
      // Ensure id is parsed as a number
      if (key === "id") {
          jsonObject[key] = parseInt(value);
      } else {
          jsonObject[key] = value;
      }
  });

  // Add requiresPermission attribute with value true
  jsonObject["requiresPermission"] = true;
// Add answer attribute with value true
jsonObject["answer"] = [];
// Add excel attribute with value true
jsonObject["excel"] = [];


  // Send data to GitHub API to update JSON file
  const repoOwner = "Jacksthehusky";
  const repoName = "Maderij.github.io";
  const branchName = "main"; // Or your desired branch name
  const filePath = "data/questions.json"; // Path to your JSON file in the repository

  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: "GET",
      headers: {
          "Authorization": `token ${accessToken}`
      }
  })
  .then(response => response.json())
  .then(data => {
      const content = b64_to_utf8(data.content); // Decode base64-encoded content
      const jsonData = JSON.parse(content);
      
      // Append new data to JSON array
      jsonData.push(jsonObject);

      // Update JSON file in the repository
      fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
          method: "PUT",
          headers: {
              "Authorization": `token ${accessToken}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              message: "Add new data",
              content: utf8_to_b64(JSON.stringify(jsonData)), // Encode content to base64
              branch: branchName,
              sha: data.sha
          })
      })
      .then(response => response.json())
      .then(data => {
          // Display success message
          document.getElementById("message").innerText = "تمت إضافة البيانات بنجاح! 🛃";
      })
      .catch(error => {
          console.error("Error updating file:", error);
          document.getElementById("message").innerText = "فشلت إضافة البيانات. الرجاء معاودة المحاولة في وقت لاحق.";
      });
  })
  .catch(error => {
      console.error("Error fetching file:", error);
      document.getElementById("message").innerText = "فشل في جلب البيانات. الرجاء معاودة المحاولة في وقت لاحق.";
  });
});
// Function to format the phone number input
document.getElementById("phone").addEventListener("input", function(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.slice(0, 8); // Ensure the maximum length is 8 characters (##/######)
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2); // Insert the '/' character
    }
    
    input.value = value;
  });