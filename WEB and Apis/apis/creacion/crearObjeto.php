<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\
global $creacion;
global $variables;

anadirACreacionTexto("mejorasEquipo", "mejorasEquipo");
anadirACreacionTexto("observaciones", "observaciones");
anadirACreacionNumero("organizativa", "organizativa");
anadirACreacionTexto("etiqueta", "etiqueta");
anadirACreacionNumero("GrupoObjetos_idGrupoObjetos", "grupoObjetos");
anadirACreacionNumero("Ubicacion_idUbicacion", "ubicacion");
anadirACreacionNumero("codigo", "codigo");
if(isset($_POST["fechaAdquisicion"])&&$_POST["fechaAdquisicion"]!=""){
$variables.=", fechaAdquisicion";
$creacion.=", date('{$_POST["fechaAdquisicion"]}')";
}

crearDatos("objeto", $conn);

$sql2="UPDATE grupoobjetos SET cantidad = cantidad + 1, cantidadDisponible = cantidadDisponible + 1 WHERE idGrupoObjetos = {$_POST["grupoObjetos"]}";
$conn->query($sql2);
?>