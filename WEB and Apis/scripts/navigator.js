window.addEventListener("hashchange",cargarPagina);
window.addEventListener("load",cargarPagina);

var aux=0;

function cargarPagina(){
    var spl=(location.hash).split("-");
    if(spl.length==1)
    switch(location.hash){
        case "#anadirObjeto":
            if($(window).width()<768) $('#sidebar, #content').toggleClass('active');
            cambiarObjeto("parts/addObject/mainAddObject.php");
            break;
        case "#gobjetos":
            if($(window).width()<768) $('#sidebar, #content').toggleClass('active');
            cambiarObjeto("parts/objects.php");
            break;
        case "#solicitudes":
            if($(window).width()<768) $('#sidebar, #content').toggleClass('active');
            cambiarObjeto("parts/requests/mainRequest.php");
            break;
        case "#usuarios":
            if($(window).width()<768) $('#sidebar, #content').toggleClass('active');
            cambiarObjeto("parts/users.php");
            break;
        case "#equiposConfigurados":
            if($(window).width()<768) $('#sidebar, #content').toggleClass('active');
            cambiarObjeto("parts/configurations.php");
            break;
        case "#perfil":
            if($(window).width()<768) $('#sidebar, #content').toggleClass('active');
            cambiarObjeto("parts/profile.php");
            break;
        case "#ingresarDatos":
            if($(window).width()<768) $('#sidebar, #content').toggleClass('active');
            cambiarObjeto("parts/insertData.php");
            break;
        default: break;
    }else{
        switch(spl[0]){
            case "#gobjetos":
            aux= parseInt(spl[1]);
            cambiarObjeto("parts/object.php");
            break;
            case "#solicitudes":
                switch(spl[1]){
                    case "usuarios":
                        cambiarObjeto("parts/requests/userRequests.php"); break;
                    case "objetos":
                        if(spl.length==2) cambiarObjeto("parts/requests/objectRequests.php");
                        else if(spl[2]=="pendientes") cambiarObjeto("parts/requests/pendingRequests.php");
                        else cambiarObjeto("parts/requests/requests.php");
                    break;
                }
            break;
            case "#objeto":
                aux= parseInt(spl[1]);
                cambiarObjeto("parts/unitParts/object.php");
                break;
            case "#usuario":
                aux= parseInt(spl[1]);
                cambiarObjeto("parts/unitParts/user.php");
                break;
            case "#solicitud":
                aux= parseInt(spl[1]);
                cambiarObjeto("parts/unitParts/request.php");
                break;
        }
    }
}

function cambiarObjeto(objeto){
    $("#variableArea").empty().hide().fadeIn('50');
    $("#variableArea").hide().load(objeto).fadeIn('300');
}

function limpiarZona(objeto){
    objeto.empty().hide().fadeIn('50');
}


