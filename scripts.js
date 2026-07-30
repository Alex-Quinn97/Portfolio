console.log("Howdy, stranger! You've found the mystical magical console where my code both accomplishes my wildest goals and serves me hours of despair. Neato!");

const sections = document.querySelectorAll("section");

[...sections].forEach((section) => {
  const checkbox = section.querySelector("input");

  checkbox.addEventListener("change", () => {
    section.classList.toggle("enable-animation");
  });
});