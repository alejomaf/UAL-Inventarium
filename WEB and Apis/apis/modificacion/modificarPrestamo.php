<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$modificacion="";

$idPrestado=$_POST["idPrestado"];

if(isset($_POST["retiradoPor"])&&!empty($_POST["retiradoPor"]))
$modificacion="retiradoPor='".$_POST["retiradoPor"]."'";

if(isset($_POST["fechaSalida"])) if($modificacion=="")
$modificacion=" fechaSalida='".$_POST["fechaSalida"]."'"; else $modificacion .=", fechaSalida='".$_POST["fechaSalida"]."'";

if(isset($_POST["fechaEntrega"])) if($modificacion=="")
$modificacion=" fechaEntrega='".$_POST["fechaEntrega"]."'"; else $modificacion .=", fechaEntrega='".$_POST["fechaEntrega"]."'";

if(isset($_POST["fechaEstimadaEntrega"])&&!empty($_POST["fechaEstimadaEntrega"])) if($modificacion=="")
$modificacion=" fechaEstimadaEntrega='".$_POST["fechaEstimadaEntrega"]."'"; else $modificacion .=", fechaEstimadaEntrega='".$_POST["fechaEstimadaEntrega"]."'";

if(isset($_POST["idUsuario"])&&!empty($_POST["idUsuario"])) if($modificacion=="")
$modificacion=" Usuario_idUsuario='".$_POST["idUsuario"]."'"; else $modificacion .=", Usuario_idUsuario='".$_POST["idUsuario"]."'";

if(isset($_POST["idObjeto"])&&!empty($_POST["idObjeto"])) if($modificacion=="")
$modificacion=" Objeto_idObjeto='".$_POST["idObjeto"]."'"; else $modificacion .=", Objeto_idObjeto='".$_POST["idObjeto"]."'";

if(isset($_POST["idObjeto"])&&!empty($_POST["idObjeto"])) if($modificacion=="")
$modificacion=" Objeto_idObjeto='".$_POST["idObjeto"]."'"; else $modificacion .=", Objeto_idObjeto='".$_POST["idObjeto"]."'";

if(isset($_POST["idObjeto"])&&!empty($_POST["idObjeto"])){

    $sql2 = "SELECT * FROM objeto WHERE idObjeto=".$_POST["idObjeto"].";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {
                $grupoObjetos=$row2["GrupoObjetos_idGrupoObjetos"];
                $ubicacion=$row2["Ubicacion_idUbicacion"];
            }}
    $modificacion .=", Objeto_GrupoObjetos_idGrupoObjetos='".$grupoObjetos."'";
    $modificacion .=", Objeto_Ubicacion_idUbicacion='".$ubicacion."'";
    }


if($modificacion==null||$modificacion=="") exit();
$sql="UPDATE prestado SET ".$modificacion." WHERE idPrestado=".$idPrestado;
$conn->query($sql);
echo $conn->error;
?>