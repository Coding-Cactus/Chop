const slider = document.querySelector("#slider");
const options = document.querySelector("#options");
const optionsChildren = Array.from(options.children);

optionsChildren.forEach(option => {
   option.addEventListener("click", () => {
       const index = Array.prototype.indexOf.call(option.parentNode.children, option);
       slider.style.left = `${index * options.offsetWidth / optionsChildren.length + 1}px`;
   });
});
