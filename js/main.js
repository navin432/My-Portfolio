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
