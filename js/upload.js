{
    const pdfjsLib = window['pdfjs-dist/build/pdf']

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

    document.querySelector("#img-upload").addEventListener("change", (e) => {
        const target = e.target || window.event.srcElement;
        const files = target.files;

        const fr = new FileReader();
        fr.onload = () => {
            display(fr, target);
        };

        fr.readAsDataURL(files[0]);
    });

    document.addEventListener("paste", e => {
        e.preventDefault();

        const file = (e.clipboardData || e.originalEvent.clipboardData).files[0];

        if (file !== undefined) {
            const fr = new FileReader();

            fr.onload = () => {
                display(fr, { value: file.name });
            };

            fr.readAsDataURL(file);
        }
    });

    function display(fr, target) {
        if (target.value.match(/\.pdf$/)) {
            pdfjsLib.getDocument(fr.result).promise.then(pdf => {
                let width = 0;
                let height = 0;
                const canvases = [];

                for (let num = 1; num <= pdf.numPages; num++) {
                    pdf.getPage(num).then((page) => {
                        const viewport = page.getViewport({ scale: 1.4 });

                        const tempCanvas = document.createElement("canvas");
                        const tempContext = tempCanvas.getContext("2d");
                        tempCanvas.height = viewport.height;
                        tempCanvas.width = viewport.width;

                        width = Math.max(width, viewport.width);
                        height += viewport.height;

                        const renderContext = {
                            canvasContext: tempContext,
                            viewport: viewport
                        };

                        page.render(renderContext).promise.then(() => {
                            canvases.push({ canvas: tempCanvas, num: num });

                            if (canvases.length === pdf.numPages) {
                                const finalCanvas = document.createElement("canvas");
                                const finalContext = finalCanvas.getContext("2d");

                                finalCanvas.height = height;
                                finalCanvas.width = width;

                                canvases.sort((a, b) => a.num - b.num);

                                let dy = 0;
                                canvases.forEach(canvas => {
                                    finalContext.drawImage(canvas.canvas, 0, dy);
                                    dy += canvas.canvas.height;
                                });

                                document.querySelector("#img-display").src = finalCanvas.toDataURL("image/png");

                                document.querySelector("#img-display").classList.remove("hidden");
                                document.querySelector("#upload").classList.add("hidden");
                                document.querySelector("#remove").classList.remove("hidden");
                                document.querySelector("#lines").classList.remove("hidden");

                                if (pdf.numPages > 1) {
                                    document.querySelector("#display").classList.add("multi-page");
                                } else {
                                    document.querySelector("#display").classList.remove("multi-page");
                                }
                            }
                        });
                    });
                }
            });
        } else {
            document.querySelector("#img-display").src= fr.result;
            document.querySelector("#img-display").classList.remove("hidden")
            document.querySelector("#upload").classList.add("hidden");
            document.querySelector("#remove").classList.remove("hidden");
            document.querySelector("#lines").classList.remove("hidden");
            document.querySelector("#display").classList.remove("multi-page");
        }
    }
}
