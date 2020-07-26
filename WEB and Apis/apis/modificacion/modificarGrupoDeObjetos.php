<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\
$modificacion="";

$idGrupoObjetos=$_POST["idGrupoObjetos"];

if(isset($_POST["nombre"])&&!empty($_POST["nombre"]))
$modificacion="nombre='".$_POST["nombre"]."'";

if(isset($_POST["imagen"])&&!empty($_POST["imagen"])) if($modificacion=="")
$modificacion=" imagen='".$_POST["imagen"]."'"; else $modificacion .=", imagen='".$_POST["imagen"]."'";

if(isset($_POST["cantidad"])) if($modificacion=="")
$modificacion=" cantidad='".$_POST["cantidad"]."'"; else $modificacion .=", cantidad='".$_POST["cantidad"]."'";

if(isset($_POST["marca"])) if($modificacion=="")
$modificacion=" marca='".$_POST["marca"]."'"; else $modificacion .=", marca='".$_POST["marca"]."'";

if(isset($_POST["modelo"])&&!empty($_POST["modelo"])) if($modificacion=="")
$modificacion=" modelo='".$_POST["modelo"]."'"; else $modificacion .=", modelo='".$_POST["modelo"]."'";

if(isset($_POST["cantidadDisponible"])) if($modificacion=="")
$modificacion=" cantidadDisponible='".$_POST["cantidadDisponible"]."'"; else $modificacion .=", cantidadDisponible='".$_POST["cantidadDisponible"]."'";


if($modificacion==null||$modificacion=="") exit();
$sql="UPDATE grupoobjetos SET ".$modificacion." WHERE idGrupoObjetos=".$idGrupoObjetos;
$conn->query($sql);
echo $conn->error;
?>