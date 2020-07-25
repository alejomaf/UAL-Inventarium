<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$idObjeto=$_POST["idObjeto"];

$sql="DELETE FROM configuracion WHERE Objeto_idObjeto=".$idObjeto.";";
$conn->query($sql);

$sql="DELETE FROM prestado WHERE Objeto_idObjeto=".$idObjeto.";";
$conn->query($sql);

$sql="DELETE FROM objeto WHERE idObjeto=".$idObjeto.";";
$conn->query($sql);

?>