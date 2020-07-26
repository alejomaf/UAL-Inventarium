<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\
$modificacion="";

$idUsuario=$_POST["idUsuario"];

if(isset($_POST["name"])&&!empty($_POST["name"]))
$modificacion="nombre='".$_POST["name"]."'";

if(isset($_POST["password"])&&!empty($_POST["password"])) if($modificacion=="")
$modificacion=" contrasena='".$_POST["password"]."'"; else $modificacion .=", contrasena='".$_POST["password"]."'";

if(isset($_POST["email"])&&!empty($_POST["email"])) if($modificacion=="")
$modificacion=" correoElectronico='".$_POST["email"]."'"; else $modificacion .=", correoElectronico='".$_POST["email"]."'";

if(isset($_POST["rank"])) if($modificacion=="")
$modificacion=" rango='".$_POST["rank"]."'"; else $modificacion .=", rango='".$_POST["rank"]."'";

if(isset($_POST["department"])&&!empty($_POST["department"])) if($modificacion=="")
$modificacion=" departamento='".$_POST["department"]."'"; else $modificacion .=", departamento='".$_POST["department"]."'";

if(isset($_POST["phone"])&&!empty($_POST["phone"])) if($modificacion=="")
$modificacion=" telefono='".$_POST["phone"]."'"; else $modificacion .=", telefono='".$_POST["phone"]."'";


if($modificacion==null||$modificacion=="") exit();
$sql="UPDATE usuario SET ".$modificacion." WHERE idUsuario=".$idUsuario;
$conn->query($sql);
echo $conn->error;
?>