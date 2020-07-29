<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
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