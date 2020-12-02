<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idObjeto=$_POST["idObjeto"];

anadirAModificacionTexto("mejorasEquipo", "mejorasEquipo");
anadirAModificacionTexto("codigo", "codigo");
anadirAModificacionNumero("GrupoObjetos_idGrupoObjetos", "idGrupoObjetos");
anadirAModificacionNumero("Ubicacion_idUbicacion", "ubicacion");
anadirAModificacionTexto("observaciones", "observaciones");
anadirAModificacionNumero("organizativa", "organizativa");
anadirAModificacionTexto("etiqueta", "etiqueta");

mostrarDatos("objeto", "idObjeto", $idObjeto, $conn);
?>