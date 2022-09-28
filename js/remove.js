{
    document.querySelector("#remove").addEventListener("click", () => {
        document.querySelector("#img-upload").value = "";
        document.querySelector("#img-display").src = "";
        document.querySelector("#img-display").classList.add("hidden");
        document.querySelector("#remove").classList.add("hidden");
        document.querySelector("#upload").classList.remove("hidden");
        document.querySelector("#active-line").classList.add("hidden");
        document.querySelector("#lines").innerHTML = "";
        document.querySelector("#result").innerHTML = "";
    });
}
