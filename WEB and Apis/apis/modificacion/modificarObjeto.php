<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idObjeto=$_POST["idObjeto"];

anadirAModificacionTexto("mejorasEquipo", "mejorasEquipo");
anadirAModificacionNumero("codigo", "codigo");
anadirAModificacionNumero("GrupoObjetos_idGrupoObjetos", "idGrupoObjetos");
anadirAModificacionNumero("Ubicacion_idUbicacion", "ubicacion");

mostrarDatos("objeto", "idObjeto", $idObjeto, $conn);
?>