// Domain
document.addEventListener("DOMContentLoaded", function () {
  const typedItems = document
    .getElementById("domain")
    .getAttribute("data-typed-items")
    .split(",");

  new Typed("#domain", {
    strings: typedItems,
    typeSpeed: 60,
    backSpeed: 50,
    loop: true,
    backDelay: 1500,
    startDelay: 500,
  });
});

// Collapsibles
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// skills
const skill = Array.from(document.querySelectorAll(".skill"));
skill.forEach((item) => {
  const skillPercent = item.children[1].children[1].textContent;
  const skillBackground = item.children[0].children[0];
  skillBackground.style.width = skillPercent;
});

// Higlighting Active Link
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav__list .list__item a");

  const options = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeSectionId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.parentElement.classList.remove("active");
        });

        const activeLink = document.querySelector(
          `.nav__list .list__item a[href="#${activeSectionId}"]`
        );
        if (activeLink) {
          activeLink.parentElement.classList.add("active");
        }
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
