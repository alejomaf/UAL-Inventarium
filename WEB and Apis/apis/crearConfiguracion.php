<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../connection/checkLogin.php";
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
header("Location: ../index.php");
?>