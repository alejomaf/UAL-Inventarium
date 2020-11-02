<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/connection.php";
//-------------------------------------------------------\\

$ip=$_POST["ip"];
$mac=$_POST["mac"];
$boca=$_POST["boca"];
$armario=$_POST["armario"];
$usuario=$_POST["usuario"];
$contrasena=$_POST["contrasena"];
$objeto=$_POST["objeto"];


$sql="INSERT INTO configuracion(ip, mac, boca, armario, usuario, contrasena, Objeto_idObjeto) VALUES ('".$ip."','".$mac."','".$boca."','".$armario."','".$usuario."','".$contrasena."',".$objeto.");";

$conn->query($sql);
$conn->error;
?>