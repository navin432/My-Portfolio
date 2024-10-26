// Animation
AOS.init();
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
  let skillsAnimated = false;
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

  // The Hiring Hub Development Message
  const thhdevelop_btn = document.getElementById("thhdevelop");
  const thh_message = document.getElementById("thhmsg");

  thhdevelop_btn.addEventListener("click", function () {
    thhdevelop_btn.disabled = true;
    thhdevelop_btn.classList.replace("btn--white", "btn--transparent");
    thhdevelop_btn.textContent = "Sorry 😢!";

    thh_message.style.display = "block";
    thh_message.textContent =
      "The Hiring Hub is still under development. Updates will be shared post-deployment. Stay tuned for the latest developments!";

    setTimeout(() => {
      thhdevelop_btn.disabled = false;
      thhdevelop_btn.classList.replace("btn--transparent", "btn--white");
      thhdevelop_btn.textContent = "On Development";
      thh_message.style.display = "none";
    }, 6000);
  });
});

// Email
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const sendButton = document.getElementById("send-btn");
    sendButton.disabled = true;
    sendButton.innerText = "Sending...";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("msg").value;
    const formMessage = document.getElementById("form-message");
    formMessage.style.display = "none";

    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => {
        if (response.ok) {
          formMessage.textContent = "Message Sent Successfully!";
          formMessage.style.color = "#28a745";
          formMessage.style.display = "block";
          sendButton.disabled = false;
          sendButton.innerText = "Send Message";
          document.getElementById("contact-form").reset();
        } else {
          formMessage.textContent = "Message Failed to Send.";
          formMessage.style.color = "#dc3545";
          formMessage.style.display = "block";
          sendButton.disabled = false;
          sendButton.innerText = "Send Message";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        formMessage.textContent = "Message Failed to Send.";
        formMessage.style.color = "#dc3545";
        formMessage.style.display = "block";
        sendButton.disabled = false;
        sendButton.innerText = "Send Message";
      });
  });
