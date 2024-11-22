const button = document.getElementById("mode-selector");
const primaryTitle = document.getElementById("page-title");
const body = document.body;
const footer = document.querySelector("footer");


button.addEventListener("click", () => {
    button.classList.toggle("dark-mode");
    body.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");

    if(primaryTitle.innerText === "Light Mode ON") {
        primaryTitle.innerText = "Dark Mode ON";
        button.innerText = "Light Mode"
    }

    else {
        primaryTitle.innerText = "Light Mode ON";
        button.innerText = "Dark Mode"
    }
})
