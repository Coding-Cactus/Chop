document.querySelector("#img-upload").addEventListener("change", (e) => {
    const target = e.target || window.event.srcElement;
    const files = target.files;

    const fr = new FileReader();
    fr.onload = () => {
      document.querySelector("#img-display").style.backgroundImage = `url(${fr.result})`;
      document.querySelector("#upload").classList.add("hidden");
      document.querySelector("#remove").classList.remove("hidden");
    };

    fr.readAsDataURL(files[0]);
});
