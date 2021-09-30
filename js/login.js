//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("desplegar").innerHTML = "Bienvenido/a " + sessionStorage.getItem("user");
});

function mostrarUsuario(){
    var usuario = document.getElementById("correo").value;
    sessionStorage.setItem("user", usuario);
}

function cerrarSesion() {
    sessionStorage.removeItem("user");

    cerrarSesion();
}




