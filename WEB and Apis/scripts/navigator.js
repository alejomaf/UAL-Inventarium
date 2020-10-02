var redireccionPagina=document.getElementById("content");

window.onhashchange = function () {
    switch(location.hash){
        case "#anadirObjeto":
            cambiarObjeto("parts/addObject.php");
            break;
        case "#objetos":
            cambiarObjeto("parts/objects.php");
            break;
        case "#solicitudes":
            break;
        case "#usuarios":
            break;
        case "#equiposConfigurados":
            break;
        case "#panelAdministrador":
            break;
        default: break;
    }
};

function cambiarObjeto(objeto){
    $("#variableArea").empty();
    $("#variableArea").load(objeto);
}