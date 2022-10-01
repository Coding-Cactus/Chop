{
    const slider = document.querySelector("#slider");
    const options = document.querySelector("#options");
    const optionsChildren = Array.from(options.children);
    const activeLine = document.querySelector("#active-line");

    optionsChildren.forEach(option => {
        option.addEventListener("click", () => {
            const index = Array.prototype.indexOf.call(option.parentNode.children, option);
            slider.style.left = `${index * options.offsetWidth / optionsChildren.length + 1}px`;

            activeLine.classList.forEach(c => {
                if (c !== "hidden") activeLine.classList.remove(c);
            });
            activeLine.classList.add(option.id);

            activeLine.style.width = "";
            activeLine.style.height = "";
        });
    });
}
