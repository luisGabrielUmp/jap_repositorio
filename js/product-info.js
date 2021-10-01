var product = {};
var comentaryArray = {};
var relatedProductsArray = {};
var relatedObj = {}

// Funcion que imprime las imagenes de producto
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
      let image = array[i];
      
  if(i == 0) {

        htmlContentToAppend += `
              <div class="carousel-item active">
                <img src="${image}" class="d-block w-100" alt="...">
              </div>
        `
        continue;
  }
  
  htmlContentToAppend += `
              <div class="carousel-item">
                <img src="${image}" class="d-block w-100" alt="...">
              </div>
  `

  document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
  }
}


// Funcion que imprime los comentarios
function showComentary(comentaryArray){
    let comentaryListToAppend = "";
    for (let i = 0; i < comentaryArray.length; i++) {
        const comentary = comentaryArray[i];
        
        comentaryListToAppend += `
        <div class="col">
        <hr><div><strong>Comentario de </strong><div class="badge rounded-pill bg-primary text-light"> ${comentary.user} ( ${comentary.dateTime} ) :</div></div><br>
        <div class="text-secondary"> ${comentary.description} </div><br>
        <div class="text-warning">${calificar(comentary.score)} </div>
        </div> 
        `
    }
        document.getElementById("comentaryList").innerHTML = comentaryListToAppend;
}

// Funcion para imprimir los productos relacionados
function showRelatedProducts(relatedProductsArray){
        let relatedProductsToAppend = "";
      
        for (let relacionado of relatedProductsArray) {
          let related = relatedObj[relacionado];
                
            relatedProductsToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
            <img src=" ${related.imgSrc} " class="img-fluid img-thumbnail"><br>
            <div class="text-center">
            <h4 class="alert-primary"><strong> ${related.name} </strong></h4>
            <div class="col-12 text-secondary"> ${related.description} </div><br>
            <div class="text-primary"><strong>Precio: </strong> ${related.currency} ${related.cost} </div>
            </div></div>
            `

        }
    document.getElementById("relatedProduct").innerHTML = relatedProductsToAppend;
}

//Función que se ejecuta cuando esten todos los elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
// Llamada a Json para acceder a los datos de la info del producto
  getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    
   if (resultObj.status === "ok") {
    product = resultObj.data;
    let productNameHTML  = document.getElementById("productName");
    let productDescriptionHTML = document.getElementById("productDescription");
    let productCostHTML = document.getElementById("productCost");
    let productCriteriaHTML = document.getElementById("productCriteria");
    
    productNameHTML.innerHTML = product.name;
    productDescriptionHTML.innerHTML = product.description;
    productCostHTML.innerHTML = product.currency + product.cost;
    productCriteriaHTML.innerHTML = product.soldCount + ` Articulos`;
            
//Muestro las imagenes en forma de galería
    showImagesGallery(product.images);
   }  
  });

//Llamada a json para los comentarios del producto
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultComentObj){
    if (resultComentObj.status === "ok") {
      let comentaryJson = resultComentObj.data;
      showComentary(comentaryJson);
    }
  });
    
//Llamada a json para los productos relacionados
  getJSONData(PRODUCTS_URL).then(function(resultRelatObj){
    if (resultRelatObj.status === "ok") {
      relatedObj = resultRelatObj.data;
      showRelatedProducts(product.relatedProducts);
    }
  });
    
  nuevoComentario();
});

// Funcion para mostrar las estrellas
function calificar(nota){
    let iconos = ""

    for (let i=1; i<=5; i++){ // contador de 1 a 5
        if(i<=nota){ // si i es menor o igual al parametro
        iconos += '<i class="fas fa-star"></i>'; // imprimo estrellas pintadas
        } else { // sino
        iconos += '<i class="far fa-star"></i>'; // imprimo contorno de estrellas
        }
    }
    return iconos;
}

// Funcion para agregar nuevos comentarios
function nuevoComentario(){
    let comentaryToAppend = "";
    let estrella = document.getElementById("idClasificacion").value;
    let comentary = document.getElementById("exampleFormControlTextarea1").value;
    let nombre = sessionStorage.getItem("user");
    let date = new Date()
    let finalDate = date.toLocaleDateString("es-ES", {
      day : "2-digit",
      month : "2-digit",
      year : "numeric",

    });
    let hora = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();

    comentaryToAppend += `
    <div class="col">
    <hr><p4><strong>Comentario de </strong><p4 class="badge rounded-pill bg-primary text-light"> ${nombre} ( ${finalDate} ${hora}:${minutos}:${segundos} ) :</p4></p4><br>
    <p4 class="text-secondary"> ${comentary} </p4><br>
    <p4 class="text-warning">${calificar(estrella)} </p4>
    </div> 
    `

    document.getElementById("comentaryList").innerHTML = document.getElementById("comentaryList").innerHTML + comentaryToAppend;
}