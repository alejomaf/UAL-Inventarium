<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\
$modificacion="";

$idUsuario=$_POST["idUsuario"];

anadirAModificacionTexto("nombre", "name");
anadirAModificacionTexto("contrasena", "password");
anadirAModificacionTexto("correoElectronico", "email");
anadirAModificacionTexto("rango", "rank");
anadirAModificacionTexto("departamento", "department");
anadirAModificacionTexto("telefono", "phone");

mostrarDatos("usuario", "idUsuario", $idUsuario, $conn);
?>