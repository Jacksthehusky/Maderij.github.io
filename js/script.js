// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// Toggle between showing and hiding the sidebar when clicking the menu icon
function w3_open() {
  var mySidebar = document.getElementById("mySidebar");
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none";
  } else {
    mySidebar.style.display = "block";
  }
}
function w3_close() {
  var mySidebar = document.getElementById("mySidebar");
  mySidebar.style.display = "none";
}

/*===============  Scroll sections active link ===============*/
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("div.header a.navbartop");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(id)) {
          link.classList.add("active");
        }
      });
    }
  });
});

/*===============  Scroll reveal ===============*/
ScrollReveal({
  //reset: true,
  distance: "80px",
  duration: 1000,
  delay: 100,
});

ScrollReveal().reveal(".home-content, .map, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form, .team, .about-content",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .systemreq-content", {
  origin: "right",
});
