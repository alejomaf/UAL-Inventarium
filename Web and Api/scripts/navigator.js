window.addEventListener("hashchange", cargarPagina);
//window.addEventListener("load", cargarPagina);

var aux = -1;

function cargarPagina() {
    var spl = (location.hash).split("-");
    if (spl.length == 1)
        switch (location.hash) {
            case "#inicio":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/views/welcome.php");
                break;
            case "#anadirObjeto":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/addObjectView/mainAddObject.php");
                break;
            case "#gobjetos":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/objectsGroupView/objects.php");
                break;
            case "#solicitudes":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/requestsViews/mainRequest.php");
                break;
            case "#usuarios":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/views/users.php");
                break;
            case "#equiposConfigurados":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/views/configurations.php");
                break;
            case "#perfil":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/views/profile.php");
                break;
            case "#ingresarDatos":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/views/insertData.php");
                break;
            case "#misprestamos":
                if ($(window).width() < 768) $('#sidebar, #content').toggleClass('active');
                cambiarObjeto("parts/views/myloans.php");
                break;
            default:
                location.hash = "#inicio";
                break;
        } else {
        switch (spl[0]) {
            case "#gobjetos":
                cambiarObjeto("parts/objectView/object.php");
                aux = parseInt(spl[1]);
                break;
            case "#solicitudes":
                switch (spl[1]) {
                    case "usuarios":
                        cambiarObjeto("parts/requestsViews/userRequests.php"); break;
                    case "objetos":
                        if (spl.length == 2) cambiarObjeto("parts/requestsViews/objectRequests.php");
                        else if (spl[2] == "pendientes") cambiarObjeto("parts/requestsViews/pendingRequests.php");
                        else cambiarObjeto("parts/requestsViews/requests.php");
                        break;
                }
                break;
            case "#objeto":
                cambiarObjeto("parts/unitPartsViews/objectUnitView/object.php");
                aux = parseInt(spl[1]);
                break;
            case "#usuario":
                cambiarObjeto("parts/unitPartsViews/userUnitView/user.php");
                aux = parseInt(spl[1]);
                break;
            case "#solicitud":
                cambiarObjeto("parts/unitPartsViews/request.php");
                aux = parseInt(spl[1]);
                break;
            case "#prestamos":
                cambiarObjeto("parts/views/myloans.php");
                aux = parseInt(spl[1]);
                break;
            case "#anadirObjeto":
                cambiarObjeto("parts/addObjectView/mainAddObject.php");
                aux = parseInt(spl[1]);
                break;
        }
    }
}


function cambiarObjeto(objeto) {
    aux = -1;
    $("#variableArea").empty().hide().fadeIn('50');
    $("#variableArea").hide().load(objeto).fadeIn('300');
}

function limpiarZona(objeto) {
    objeto.empty().hide().fadeIn('50');
}


