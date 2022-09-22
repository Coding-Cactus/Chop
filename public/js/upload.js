document.querySelector("#img").addEventListener("change", (e) => {
    const target = e.target || window.event.srcElement;
    const files = target.files;

    const fr = new FileReader();
    fr.onload = () => {
      document.querySelector("#display img").src = fr.result;
    };

    fr.readAsDataURL(files[0])
});
