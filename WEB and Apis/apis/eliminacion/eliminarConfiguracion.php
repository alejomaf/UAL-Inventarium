<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$idConfiguracion=$_POST["idConfiguracion"];

$sql="DELETE FROM configuracion WHERE idConfiguracion=".$idConfiguracion.";";
$conn->query($sql);

?>