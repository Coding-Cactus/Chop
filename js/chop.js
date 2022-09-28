{
    function getContainedSize(img) {
        const ratio = img.naturalWidth / img.naturalHeight;
        let width = img.height * ratio;
        let height = img.height;

        if (width > img.width) {
            width = img.width;
            height = img.width/ratio;
        }

        return [width, height];
    }

    const margin = 1;
    const uploaded = document.querySelector("#img-display");

    document.querySelector("#submit").addEventListener("click", () => {
        if (uploaded.src === "" || uploaded.classList.contains("hidden")) return;

        const img = new Image();
        img.src = uploaded.src;

        img.onload = () => {
            let hCount = 0;
            let boundingY = 0;

            const dims = getContainedSize(uploaded);
            const boxWidth = dims[0];
            const boxHeight = dims[1];

            const dx = (uploaded.width - boxWidth) / 2;
            const dy = (uploaded.height - boxHeight) / 2;

            const display = document.querySelector("#display");

            const styles = window.getComputedStyle(display, null);
            const paddingLeft = parseInt(styles.getPropertyValue("padding-left").slice(0, -2));
            const paddingTop  = parseInt(styles.getPropertyValue("padding-top").slice(0, -2));

            const horizontals = Array.from(document.querySelectorAll("#lines .horizontal"));

            const pxHorizontals = horizontals.map(h => parseInt(h.style.top.slice(0, -2)) - dy - paddingTop);
            pxHorizontals.push(boxHeight);

            pxHorizontals.sort((a, b) => a - b);

            pxHorizontals.forEach(y => {
                let vCount = 0;
                let boundingX = 0;

                const relativeHeight = y - boundingY;
                const realHeight = (relativeHeight/ boxHeight) * img.height;
                const realOffsetY = (boundingY / boxHeight) * img.height;

                const verticals = Array.from(document.querySelectorAll("#lines .vertical"));

                const pxVerticals = verticals.map(v => parseInt(v.style.left.slice(0, -2)) - dx - paddingLeft);
                pxVerticals.push(boxWidth);

                pxVerticals.sort((a, b) => a - b);

                pxVerticals.forEach(x => {
                    const relativeWidth = x - boundingX;
                    const realWidth = (relativeWidth / boxWidth) * img.width;
                    const realOffsetX = (boundingX / boxWidth) * img.width;

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

                    canvas.style.left = `${paddingLeft + dx + boundingX + vCount * margin}px`;
                    canvas.style.top = `${paddingTop + dy + boundingY + hCount * margin}px`;
                    canvas.style.width = `${relativeWidth - (verticals.length - 1) * margin}px`;
                    canvas.style.height = `${relativeHeight - (horizontals.length - 1) * margin}px`;

                    document.querySelector("#result").appendChild(canvas);

                    boundingX = x;
                    vCount++;
                });
                boundingY = y
                hCount++;
            });

            uploaded.classList.add("hidden");
            document.querySelector("#lines").classList.add("hidden");
        };
    });
}
