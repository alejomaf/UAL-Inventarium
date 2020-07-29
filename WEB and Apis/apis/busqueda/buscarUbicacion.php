<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";


anadirAConsultaTexto("ubicacion","ubicacion");
anadirAConsultaTexto("planta","planta");
anadirAConsultaTexto("edificio","edificio");

mostrarDatos("ubicacion", $busqueda, $conn);
?>