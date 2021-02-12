$("#mostrarOpciones").click(function () {
    $("#opcionesAvanzadas").fadeOut(400);
    $("#opciones").fadeToggle(400);
});
$("#mostrarOpcionesAvanzadas").click(function () {
    $("#opcionesAvanzadas").fadeToggle(400);
});

delete busquedaO.GrupoObjetos_idGrupoObjetos;

$("#buscarObjetos").attr("onclick", "buscar();");
$("#buscarObjetos").keypress(function(e) {
    if(e.which == 13) {
        buscar();
     }
});

async function buscar() {
    if ($("#nombre").val() != "") {
        busquedaGO.nombre = $("#nombre").val();
    } else {
        busquedaGO.nombre = "%";
    }
    if ($("#marca").val() != "") {
        busquedaGO.marca = $("#marca").val();
    } else {
        delete busquedaGO.marca;
    }
    if ($("#modelo").val() != "") {
        busquedaGO.modelo = $("#modelo").val();
    } else {
        delete busquedaGO.modelo;
    }
    if ($("#codigo").val() != "") {
        busquedaO.codigo = $("#codigo").val();
    } else {
        delete busquedaO.codigo;
    }
    if ($("#mejorasDelEquipo").val() != "") {
        busquedaO.mejorasEquipo = $("#mejorasDelEquipo").val();
    } else {
        delete busquedaO.mejorasEquipo;
    }
    if ($("#etiqueta").val() != "") {
        busquedaO.etiqueta = $("#etiqueta").val();
    } else {
        delete busquedaO.etiqueta;
    }
    if ($("#organizativa").val() != -1) {
        busquedaO.organizativa = $("#organizativa").val();
    } else {
        delete busquedaO.organizativa;
    }
    if ($("#observaciones").val() != "") {
        busquedaO.observaciones = $("#observaciones").val();
    } else {
        delete busquedaO.observaciones;
    }
    if(!(Object.keys(busquedaO).length != 1&&Object.keys(busquedaGO).length == 1)){
    await cargarGrupoObjetos();}
    if (Object.keys(busquedaO).length != 1) {
        await cargarObjetos();
    }
}