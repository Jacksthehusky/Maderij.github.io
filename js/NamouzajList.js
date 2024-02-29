fetch("../data/Namouzaj.json")
  .then((response) => response.json())
  .then((questions) => {
    const faqsContainer = document.getElementById("faqs");
    const searchInput = document.getElementById("search");

    // Update questions on search input
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredQuestions = questions.filter((question) =>
        question.name.toLowerCase().includes(searchTerm)
      );
      updateQuestions(filteredQuestions);
    });

    // Initial load of all questions
    updateQuestions(questions);

    function updateQuestions(filteredQuestions) {
      // Clear previous questions
      faqsContainer.innerHTML = "";

      // Group questions by group field
      const groupedQuestions = filteredQuestions.reduce((acc, question) => {
        acc[question.group] = acc[question.group] || [];
        acc[question.group].push(question);
        return acc;
      }, {});

      // Append questions by group
      for (const group in groupedQuestions) {
        const groupTitle = document.createElement("h2");
        groupTitle.innerText = group;
        faqsContainer.appendChild(groupTitle);

        groupedQuestions[group].forEach((question) => {
          const questionElement = document.createElement("a");
          const questionContainer = document.createElement("p");
          questionElement.innerHTML = question.name;
          questionElement.href = `NamouzajDetail.html?id=${question.id}`;
          questionContainer.appendChild(questionElement);
          faqsContainer.appendChild(questionContainer);

          // Check if question requires permission to view
          if (question.requiresPermission) {
            questionElement.addEventListener("click", (event) => {
              event.preventDefault();
              const password = prompt("Access denied.");
              if (password === "hadi123") {
                window.location.href = questionElement.href;
              } else {
                alert(
                  "يرجى التواصل مع خدمة العملاء لدينا للحصول على المساعدة في الوصول إلى هذه البيانات"
                );
              }
            });
          }
        });
      }
    }
  })
  .catch((error) => console.error(error));
