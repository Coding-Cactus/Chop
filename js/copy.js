{
    document.querySelector("#copy").addEventListener("click", () => {
        const images = document.querySelector("#images");

        let previous;

        document.querySelectorAll("canvas").forEach(canvas => {
            const img = document.createElement("img");

            if (previous !== canvas.style.top) {
                const blank = document.createElement("br");
                images.appendChild(blank);
                previous = canvas.style.top;
            } else {
                img.style.marginLeft = "5px";
            }

            img.width = canvas.width;
            img.height = canvas.height;
            img.src = canvas.toDataURL();

            images.appendChild(img);
        });

        const range = document.createRange();
        range.selectNode(images);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();

        images.innerHTML = ""

        alert("Copied!");
    });
}
