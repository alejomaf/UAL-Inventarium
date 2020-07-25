<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$idPrestamo=$_POST["idPrestamo"];

$sql="DELETE FROM prestado WHERE idPrestado=".$idPrestamo.";";
$conn->query($sql);

?>