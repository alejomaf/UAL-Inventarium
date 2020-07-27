<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$modificacion="";

$idConfiguracion=$_POST["idConfiguracion"];

if(isset($_POST["ip"])&&!empty($_POST["ip"]))
$modificacion="ip='".$_POST["ip"]."'";

if(isset($_POST["mac"])) if($modificacion=="")
$modificacion=" mac='".$_POST["mac"]."'"; else $modificacion .=", mac='".$_POST["mac"]."'";

if(isset($_POST["boca"])) if($modificacion=="")
$modificacion=" boca='".$_POST["boca"]."'"; else $modificacion .=", boca='".$_POST["boca"]."'";

if(isset($_POST["armario"])&&!empty($_POST["armario"])) if($modificacion=="")
$modificacion=" armario='".$_POST["armario"]."'"; else $modificacion .=", armario='".$_POST["armario"]."'";

if(isset($_POST["usuario"])&&!empty($_POST["usuario"])) if($modificacion=="")
$modificacion=" usuario='".$_POST["usuario"]."'"; else $modificacion .=", usuario='".$_POST["usuario"]."'";

if(isset($_POST["contrasena"])&&!empty($_POST["contrasena"])) if($modificacion=="")
$modificacion=" contrasena='".$_POST["contrasena"]."'"; else $modificacion .=", contrasena='".$_POST["contrasena"]."'";

if(isset($_POST["idObjeto"])&&!empty($_POST["idObjeto"])) if($modificacion=="")
$modificacion=" Objeto_idObjeto='".$_POST["idObjeto"]."'"; else $modificacion .=", Objeto_idObjeto='".$_POST["idObjeto"]."'";


if($modificacion==null||$modificacion=="") exit();
$sql="UPDATE configuracion SET ".$modificacion." WHERE idConfiguracion=".$idConfiguracion;
$conn->query($sql);
echo $conn->error;
?>