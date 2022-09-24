document.querySelector("#remove").addEventListener("click", () => {
    document.querySelector("#img-upload").value = "";
    document.querySelector("#img-display").style.backgroundImage = "";
    document.querySelector("#remove").classList.add("hidden");
    document.querySelector("#upload").classList.remove("hidden");
});
