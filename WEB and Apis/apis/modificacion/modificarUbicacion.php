<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\
$modificacion="";

$idUbicacion=$_POST["idUbicacion"];

if(isset($_POST["location"])&&!empty($_POST["location"]))
$modificacion="ubicacion='".$_POST["location"]."'";

if(isset($_POST["floor"])&&!empty($_POST["floor"])) if($modificacion=="")
$modificacion=" planta='".$_POST["floor"]."'"; else $modificacion .=", planta='".$_POST["floor"]."'";

if(isset($_POST["building"])&&!empty($_POST["building"])) if($modificacion=="")
$modificacion=" edificio='".$_POST["building"]."'"; else $modificacion .=", edificio='".$_POST["building"]."'";


if($modificacion==null||$modificacion=="") exit();
$sql="UPDATE ubicacion SET ".$modificacion." WHERE idUbicacion=".$idUbicacion;
$conn->query($sql);
echo $conn->error;
?>