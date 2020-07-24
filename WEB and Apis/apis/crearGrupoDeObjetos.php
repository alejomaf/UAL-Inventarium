<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../connection/checkLogin.php";
//-------------------------------------------------------\\

$cantidad=$_POST["cantidad"];
$nombre=$_POST["nombre"];
$imagen=$_POST["imagen"];
$marca=$_POST["marca"];
$modelo=$_POST["modelo"];
$cantidadDisponible=$_POST["cantidadDisponible"];


$sql="INSERT INTO grupoobjetos(cantidad, nombre, imagen, marca, modelo, cantidadDisponible) VALUES ('".$cantidad."','".$nombre."','".$imagen."','".$marca."','".$modelo."','".$cantidadDisponible."');";

$conn->query($sql);
echo $conn->error;
?>