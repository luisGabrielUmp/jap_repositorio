var product = {};
var comentaryArray = {};
var relatedProductsArray = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComentary(comentaryArray){
    let comentaryListToAppend = "";
    for (let i = 0; i < comentaryArray.length; i++) {
        const comentary = comentaryArray[i];
        
        comentaryListToAppend += `
        <div class="col">
        <hr><p4><strong>Comentario de </strong><p4 class="badge rounded-pill bg-primary text-light">` + comentary.user + ` (` + comentary.dateTime + `) :</p4></p4><br>
        <p4 class="text-secondary"> ` + comentary.description + `</p4><br><br>
        <p4 class="text-primary">Calificación: ` + comentary.score + `/5</p4>
        </div> 
        `
    }
        document.getElementById("comentaryList").innerHTML = comentaryListToAppend;
    }

    function showRelatedProducts(relatedProductsArray){
        let relatedProductsToAppend = "";
        for (let i = 0; i < relatedProductsArray.length; i++) {
            let related = relatedProductsArray[i];
            
            relatedProductsToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
            <img src="` + related.imgSrc + `" class="img-fluid img-thumbnail"><br>
            <h5>` + related.name +`</h5>
            <p4 class="col-12 text-secondary">` + related.description + `</p4><br>
            <p4 class="text-danger"><strong>Precio: </strong>` + related.currency + related.cost + `</p4>
            </div>
            `

        }
            document.getElementById("relatedProduct").innerHTML = relatedProductsToAppend;
        }




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
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
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultComentObj){
        if (resultComentObj.status === "ok") {
            let comentaryJson = resultComentObj.data;
            showComentary(comentaryJson);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultRelatObj){
        if (resultRelatObj.status === "ok") {
            showRelatedProducts(resultRelatObj.data);
        }
    });
});