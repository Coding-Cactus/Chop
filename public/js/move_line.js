{
    const img = document.querySelector("#img-display");
    const activeLine = document.querySelector("#active-line");

    document.addEventListener("mousemove", (e) => {
        if (document.querySelector("#remove").classList.contains("hidden")) return;

        const dims = img.getBoundingClientRect();
        if (e.clientX >= dims.left && e.clientX <= dims.right && e.clientY >= dims.top && e.clientY <= dims.bottom) {
            if (activeLine.classList.contains("hidden")) {
                activeLine.classList.remove("hidden");
            }

            if (activeLine.classList.contains("horizontal")) {
                activeLine.style.left = "0";
                activeLine.style.top = `${e.clientY - dims.top}px`;
            } else if (activeLine.classList.contains("vertical")) {
                activeLine.style.top = "0";
                activeLine.style.left = `${e.clientX - dims.left}px`;
            }
        } else if (!activeLine.classList.contains("hidden")) {
            activeLine.classList.add("hidden");
        }
    });
}
