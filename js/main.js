const skill = Array.from(document.querySelectorAll(".skill"));
skill.forEach((item) => {
  const skillPercent = item.children[1].children[1].textContent;
  const skillBackground = item.children[0].children[0];
  skillBackground.style.width = skillPercent;
});
