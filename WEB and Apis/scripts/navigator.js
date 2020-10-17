window.addEventListener("hashchange",cargarPagina);
window.addEventListener("load",cargarPagina);

var aux=0;

function cargarPagina(){
    var spl=(location.hash).split("-");
    if(spl.length==1)
    switch(location.hash){
        case "#anadirObjeto":
            cambiarObjeto("parts/addObject/mainAddObject.php");
            break;
        case "#gobjetos":
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
    }else{
        switch(spl[0]){
            case "#gobjetos":
            aux= parseInt(spl[1]);
            cambiarObjeto("parts/object.php");
            break;
        }
    }
}

function cambiarObjeto(objeto){
    $("#variableArea").empty();
    $("#variableArea").load(objeto);
}