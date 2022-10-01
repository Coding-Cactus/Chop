{
    const img = document.querySelector("#img-display");
    const display = document.querySelector("#display");
    const activeLine = document.querySelector("#active-line");

    document.addEventListener("mousemove", (e) => {
        if (document.querySelector("#remove").classList.contains("hidden")) return;

        const dims = img.getBoundingClientRect();

        const styles = window.getComputedStyle(display, null);
        const paddingLeft = parseInt(styles.getPropertyValue("padding-left").slice(0, -2));
        const paddingTop  = parseInt(styles.getPropertyValue("padding-top").slice(0, -2));

        const leftEdge = dims.left;
        const topEdge = dims.top;

        const width = img.offsetWidth;
        const height = img.offsetHeight;

        let dx = (display.offsetWidth - width) / 2 - paddingLeft;
        let dy = (display.offsetHeight - height) / 2 - paddingTop;

        if (dy < 0) dy = paddingTop;

        if (
            e.clientX < leftEdge || e.clientX > leftEdge + width ||
            e.clientY < topEdge || e.clientY > topEdge + height
        ) {
            if (!activeLine.classList.contains("hidden")) {
                activeLine.classList.add("hidden");
            }

            return;
        }

        if (activeLine.classList.contains("hidden")) {
            activeLine.classList.remove("hidden");
        }

        if (activeLine.classList.contains("horizontal")) {
            activeLine.style.left = `${dx}px`;
            activeLine.style.top = `${e.clientY - topEdge + dy}px`;

            activeLine.style.width = `${width}px`;
            activeLine.style.height = "";
        } else if (activeLine.classList.contains("vertical")) {
            activeLine.style.top = `${dy}px`;
            activeLine.style.left = `${e.clientX - leftEdge + dx}px`;

            activeLine.style.width = "";
            activeLine.style.height = `${height}px`;
        }
    });
}
