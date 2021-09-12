

function redireccion() {
    if (sessionStorage.getItem("user") === null) {
        window.location = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
redireccion();
});