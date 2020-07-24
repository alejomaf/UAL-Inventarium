<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../connection/checkLogin.php";
//-------------------------------------------------------\\

$location=$_POST["location"];
$floor=$_POST["floor"];
$building=$_POST["building"];
$plataforma=$_POST["plataforma"];


$sql="INSERT INTO ubicacion(ubicacion, planta, edificio) VALUES ('".$location."','".$floor."','".$building."');";

$conn->query($sql);
$conn->error;
header("Location: ../index.php");
?>