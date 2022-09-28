{
    const img = document.querySelector("#img-display");
    const activeLine = document.querySelector("#active-line");

    document.addEventListener("mousemove", (e) => {
        if (document.querySelector("#remove").classList.contains("hidden")) return;

        const dims = img.getBoundingClientRect();

        const ratio = img.naturalWidth / img.naturalHeight;
        let width = img.height * ratio;
        let height = img.height;

        if (width > img.width) {
            width = img.width;
            height = img.width/ratio;
        }

        const dx = (img.width - width) / 2;
        const dy = (img.height - height) / 2;

        if (
            e.clientX >= dims.left + dx  && e.clientX <= dims.right - dx &&
            e.clientY >= dims.top + dy && e.clientY <= dims.bottom - dy
        ) {
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
