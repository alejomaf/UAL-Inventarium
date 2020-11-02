<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
//include "../../connection/checkLogin.php";
include "../../connection/connection.php";
//-------------------------------------------------------\\

if(isset($_POST["mejorasEquipo"])&&!empty($_POST["mejorasEquipo"]))
$mejorasEquipo=$_POST["mejorasEquipo"];
else $mejorasEquipo="";
if(isset($_POST["codigo"])&&!empty($_POST["codigo"]))
$codigo=$_POST["codigo"];
else $codigo=-1;
$grupoObjetos=$_POST["grupoObjetos"];
$ubicacion=$_POST["ubicacion"];

$sql="INSERT INTO objeto(mejorasEquipo, codigo, GrupoObjetos_idGrupoObjetos, Ubicacion_idUbicacion, disponible, eliminado) VALUES ('".$mejorasEquipo."',".$codigo.",".$grupoObjetos.",".$ubicacion.",1,0);";
$sql2="UPDATE grupoobjetos SET cantidad = cantidad + 1, cantidadDisponible = cantidadDisponible + 1 WHERE idGrupoObjetos = {$grupoObjetos}";

$conn->query($sql);
echo $conn->error;
$conn->query($sql2);
?>