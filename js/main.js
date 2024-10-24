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

// Higlighting Active Link and Animating The Skills section
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav__list .list__item a");
  const skillLevels = document.querySelectorAll(".skill__level");
  const skillBars = document.querySelectorAll(".skill__line--content");
  let skillsAnimated = false; // To ensure the animation runs only once

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

        if (activeSectionId === "skills" && !skillsAnimated) {
          skillLevels.forEach((skill, index) => {
            const finalValue = skill.getAttribute("data-skill");
            let currentValue = 0;

            const increment = setInterval(() => {
              skill.textContent = `${currentValue}%`;

              if (currentValue >= finalValue) {
                clearInterval(increment);
              } else {
                currentValue++;
              }
            }, 20);

            skillBars[index].style.width = `${finalValue}%`;
          });

          skillsAnimated = true;
        }
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
