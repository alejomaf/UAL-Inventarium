<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$idUsuario=$_POST["idUsuario"];

$sql2 = "DELETE FROM prestado WHERE Usuario_idUsuario=".$idUsuario.";";
$result2 = $conn->query($sql2);

$sql="DELETE FROM usuario WHERE idUsuario=".$idUsuario.";";
$conn->query($sql);

?>