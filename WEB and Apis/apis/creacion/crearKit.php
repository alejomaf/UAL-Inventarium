<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\
global $creacion;
global $variables;

anadirACreacionTexto("disponible","disponible");
anadirACreacionTexto("Ubicacion_idUbicacion","Ubicacion_idUbicacion");
anadirACreacionNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");

crearDatos("kit", $conn);


$sql2="UPDATE grupoobjetos SET cantidad = cantidad + 1, cantidadDisponible = cantidadDisponible + 1 WHERE idGrupoObjetos = {$_POST["GrupoObjetos_idGrupoObjetos"]}";
$conn->query($sql2);
?>