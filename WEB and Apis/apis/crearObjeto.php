<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../connection/checkLogin.php";
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
$conn->query($sql);
echo $conn->error;
?>