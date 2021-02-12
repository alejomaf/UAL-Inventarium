<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idKit=$_POST["idKit"];

anadirAModificacionTexto("disponible","disponible");
anadirAModificacionTexto("Ubicacion_idUbicacion","Ubicacion_idUbicacion");
anadirAModificacionNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");
anadirAModificacionNumero("eliminado", "eliminado");


mostrarDatos("kit", "idKit", $idKit, $conn);
?>