{
    const margin = 2;
    const display = document.querySelector("#display");
    const uploaded = document.querySelector("#img-display");

    document.querySelector("#submit").addEventListener("click", () => {
        if (uploaded.src === "" || uploaded.classList.contains("hidden")) return;

        const img = new Image();
        img.src = uploaded.src;

        img.onload = () => {
            let hCount = 0;
            let boundingY = 0;

            const width = uploaded.offsetWidth;
            const height = uploaded.offsetHeight;

            let dx = (display.clientWidth - width) / 2
            let dy = (display.clientHeight - height) / 2;

            if (dy < 0) {
                const styles = window.getComputedStyle(display, null);
                dy = parseInt(styles.getPropertyValue("padding-top").slice(0, -2));
            }

            const horizontals = Array.from(document.querySelectorAll("#lines .horizontal"));

            const pxHorizontals = horizontals.map(h => parseInt(h.style.top.slice(0, -2)) - dy);
            pxHorizontals.push(height);

            pxHorizontals.sort((a, b) => a - b);

            pxHorizontals.forEach(y => {
                let vCount = 0;
                let boundingX = 0;

                const relativeHeight = y - boundingY;
                const realHeight = (relativeHeight/ height) * img.height;
                const realOffsetY = (boundingY / height) * img.height;

                const verticals = Array.from(document.querySelectorAll("#lines .vertical"));

                const pxVerticals = verticals.map(v => parseInt(v.style.left.slice(0, -2)) - dx);
                pxVerticals.push(width);

                pxVerticals.sort((a, b) => a - b);

                pxVerticals.forEach(x => {
                    const relativeWidth = x - boundingX;
                    const realWidth = (relativeWidth / width) * img.width;
                    const realOffsetX = (boundingX / width) * img.width;

                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");

                    canvas.width = realWidth;
                    canvas.height = realHeight;

                    context.drawImage(
                        img,
                        realOffsetX, realOffsetY,
                        realWidth, realHeight,
                        0, 0,
                        canvas.width, canvas.height
                    );

                    const container = document.createElement("div");

                    container.style.left   = `${dx + boundingX + vCount * margin}px`;
                    container.style.top    = `${dy + boundingY + hCount * margin}px`;
                    container.style.width  = `${relativeWidth - (verticals.length - 1) * margin}px`;
                    container.style.height = `${relativeHeight - (horizontals.length - 1) * margin}px`;

                    const button = document.createElement("button");
                    button.innerHTML = "<ion-icon name=\"close-circle-outline\"></ion-icon>"
                    button.classList.add("delete");

                    button.addEventListener("click", () => {
                        if (canvas.classList.contains("hidden")) {
                            canvas.classList.remove("hidden");
                            button.innerHTML = "<ion-icon name=\"close-circle-outline\"></ion-icon>"
                        }
                        else {
                            canvas.classList.add("hidden");
                            button.innerHTML = "<ion-icon name=\"add-circle-outline\"></ion-icon>";
                        }
                    });

                    container.appendChild(canvas);
                    container.appendChild(button);
                    document.querySelector("#result").appendChild(container);

                    boundingX = x;
                    vCount++;
                });
                boundingY = y
                hCount++;
            });

            uploaded.classList.add("hidden");
            document.querySelector("#lines").classList.add("hidden");
            document.querySelector("#copy").classList.remove("hidden");
        };
    });
}
