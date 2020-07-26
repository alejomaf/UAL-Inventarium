<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$modificacion="";

$idObjeto=$_POST["idObjeto"];

if(isset($_POST["mejorasEquipo"])&&!empty($_POST["mejorasEquipo"]))
$modificacion="mejorasEquipo='".$_POST["mejorasEquipo"]."'";

if(isset($_POST["codigo"])) if($modificacion=="")
$modificacion=" codigo='".$_POST["codigo"]."'"; else $modificacion .=", codigo='".$_POST["codigo"]."'";

if(isset($_POST["idGrupoObjetos"])) if($modificacion=="")
$modificacion=" GrupoObjetos_idGrupoObjetos='".$_POST["idGrupoObjetos"]."'"; else $modificacion .=", GrupoObjetos_idGrupoObjetos='".$_POST["idGrupoObjetos"]."'";

if(isset($_POST["ubicacion"])&&!empty($_POST["ubicacion"])) if($modificacion=="")
$modificacion=" Ubicacion_idUbicacion='".$_POST["ubicacion"]."'"; else $modificacion .=", Ubicacion_idUbicacion='".$_POST["ubicacion"]."'";


if($modificacion==null||$modificacion=="") exit();
$sql="UPDATE objeto SET ".$modificacion." WHERE idObjeto=".$idObjeto;
$conn->query($sql);
echo $conn->error;
?>