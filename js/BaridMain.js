const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
let questions = [];

// Get questions
const getQuestions = async () => {
  const res = await fetch("../data/barid.json");
  questions = await res.json();
};

// Filter questions
const searchQuestions = (searchText) => {
  // Get matches to current text input
  let matches = questions.filter((question) => {
    const regexText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const regex = new RegExp(regexText, "giu");
    return regex.test(question.name) || regex.test(question.id.toString());
  });

  // Clear when input or matches are empty
  if (searchText.length === 0 || matches.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map((match) => {
        const regex = new RegExp(`(${search.value})`, "giu");
        const highlightedQuestion = match.name.replace(
          regex,
          "<mark style='background-color: red; color:white'>$1</mark>"
        );
        return `
          <div class="card card-body" style="direction: rtl; padding-right: 10px;">
            <a href="./BaridDetail.html?id=${match.id}">
              <p>${highlightedQuestion}<p>
            </a>
          </div>
        `;
      })
      .join("");
    matchList.innerHTML = html;

    // Attach password prompt to all links
    const links = matchList.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        const questionId = href.match(/id=(\d+)/)[1];
        const question = questions.find((name) => name.id == questionId);

        if (question.requiresPermission) {
          event.preventDefault();
          const password = prompt("Access denied.");
          if (password === "hadi123") {
            window.location.href = href;
          } else {
            alert(
              "يرجى التواصل مع خدمة العملاء لدينا للحصول على المساعدة في الوصول إلى هذه البيانات"
            );
          }
        }
      });
    });
  } else {
    matchList.innerHTML =
      '<div class="alert alert-danger">No matches found</div>';
  }
};

// Add debounce to limit API calls
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

window.addEventListener("DOMContentLoaded", getQuestions);
search.addEventListener(
  "input",
  debounce(() => searchQuestions(search.value), 300)
);
