{
    const activeLine = document.querySelector("#active-line");
    const display = document.querySelector("#display");
    const lines = display.querySelector("#lines");

    display.addEventListener("click", () => {
       if (activeLine.classList.contains("hidden") || activeLine.classList.contains("erase")) return;

       const newLine = document.createElement("div");
       newLine.className = activeLine.className;
       newLine.style.top = activeLine.style.top;
       newLine.style.left = activeLine.style.left;

       lines.appendChild(newLine);

       newLine.addEventListener("click", () => {
           if (!activeLine.classList.contains("erase")) return;

           newLine.remove();
       });
    });
}
