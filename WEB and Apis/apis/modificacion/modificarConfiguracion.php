<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idConfiguracion=$_POST["idConfiguracion"];

anadirAModificacionTexto("ip", "ip");
anadirAModificacionTexto("mac", "mac");
anadirAModificacionTexto("boca", "boca");
anadirAModificacionTexto("armario", "armario");
anadirAModificacionTexto("usuario", "usuario");
anadirAModificacionTexto("contrasena", "contrasena");
anadirAModificacionNumero("Objeto_idObjeto", "idObjeto");

mostrarDatos("configuracion", "idConfiguracion", $idConfiguracion, $conn);
?>