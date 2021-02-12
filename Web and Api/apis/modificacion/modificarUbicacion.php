<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\
$modificacion="";

$idUbicacion=$_POST["idUbicacion"];

anadirAModificacionTexto("ubicacion", "location");
anadirAModificacionTexto("planta", "floor");
anadirAModificacionTexto("edificio", "building");

mostrarDatos("ubicacion", "idUbicacion", $idUbicacion, $conn);
?>