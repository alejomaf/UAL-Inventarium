<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$retiradoPor = $_POST["retiradoPor"];
$fechaSalida = "0-0-0";
$fechaEntrega = "1000-00-00";
$fechaEstimadaEntrega = $_POST["fechaEstimadaEntrega"];
$usuario = $_SESSION['idUsuario'];
$solicitado = date('Y-m-d');
$sql = "";

if (isset($_POST["objeto"])) {
    $objeto = $_POST["objeto"];

    $sql2 = "SELECT * FROM objeto WHERE idObjeto=" . $objeto . ";";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
        while ($row2 = $result2->fetch_assoc()) {
            $grupoObjetos = $row2["GrupoObjetos_idGrupoObjetos"];
            $ubicacion = $row2["Ubicacion_idUbicacion"];
        }
    }
    $sql = "INSERT INTO prestado(retiradoPor, fechaSalida, fechaEntrega, fechaEstimadaEntrega, Usuario_idUsuario, Objeto_idObjeto, Objeto_GrupoObjetos_idGrupoObjetos, 
    Objeto_Ubicacion_idUbicacion, solicitado, estado) VALUES ('" . $retiradoPor . "','" . $fechaSalida . "','" . $fechaEntrega . "','" . $fechaEstimadaEntrega . "','" . $usuario . "','" . $objeto . "','" . $grupoObjetos . "','" . $ubicacion . "','" . $solicitado . "',-1);";
} else {
    $kit = $_POST["kit"];

    $sql2 = "SELECT * FROM kit WHERE idKit=" . $kit . ";";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
        while ($row2 = $result2->fetch_assoc()) {
            $grupoObjetos = $row2["GrupoObjetos_idGrupoObjetos"];
            $ubicacion = $row2["Ubicacion_idUbicacion"];
        }
    }
    $sql = "INSERT INTO prestado(retiradoPor, fechaSalida, fechaEntrega, fechaEstimadaEntrega, Usuario_idUsuario, Objeto_GrupoObjetos_idGrupoObjetos, 
Objeto_Ubicacion_idUbicacion, solicitado, estado, Kit_idKit) VALUES ('" . $retiradoPor . "','" . $fechaSalida . "','" . $fechaEntrega . "','" . $fechaEstimadaEntrega . "','" . $usuario . "','" . $grupoObjetos . "','" . $ubicacion . "','" . $solicitado . "',-1,{$kit});";
}


$conn->query($sql);
echo $conn->error;
