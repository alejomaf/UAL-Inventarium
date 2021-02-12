<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion = "";
$idGrupoObjetos = 0;

$idPrestado = $_POST["idPrestado"];
$idKit = null;
$idObjeto = null;

//Obtengo los atributos de nuestro objeto prestado
$sql3 = "SELECT * FROM prestado WHERE idPrestado={$idPrestado}";

$result1 = $conn->query($sql3);

if ($result1->num_rows > 0) {
    while ($row = $result1->fetch_assoc()) {
        $idGrupoObjetos = $row["Objeto_GrupoObjetos_idGrupoObjetos"];
        if ($row["Objeto_idObjeto"] != null) {
            $idObjeto = $row["Objeto_idObjeto"];
        } else {
            $idKit = $row["Kit_idKit"];
        }
    }
}

anadirAModificacionTexto("retiradoPor", "retiradoPor");
anadirAModificacionTexto("fechaSalida", "fechaSalida");
anadirAModificacionTexto("fechaEntrega", "fechaEntrega");
anadirAModificacionTexto("fechaEstimadaEntrega", "fechaEstimadaEntrega");
anadirAModificacionNumero("Usuario_idUsuario", "idUsuario");
anadirAModificacionNumero("solicitado", "solicitado");
anadirAModificacionNumero("estado", "estado");


if ($_POST["estado"] == 0) {
    $sql2 = "UPDATE grupoobjetos SET cantidadDisponible = cantidadDisponible - 1 WHERE idGrupoObjetos = {$idGrupoObjetos}";
    $conn->query($sql2);
    if ($idObjeto != null) {
        $sql2 = "UPDATE objeto SET disponible = 1 WHERE idObjeto = {$idObjeto}";
        $conn->query($sql2);
    } else {
        $sql2 = "UPDATE kit SET disponible = 1 WHERE idKit = {$idKit}";
        $conn->query($sql2);
    }
} else if ($_POST["estado"] == 1) {
    $sql2 = "UPDATE grupoobjetos SET cantidadDisponible = cantidadDisponible + 1 WHERE idGrupoObjetos = {$idGrupoObjetos}";
    $conn->query($sql2);
    if ($idObjeto != null) {
        $sql2 = "UPDATE objeto SET disponible = 0 WHERE idObjeto = {$idObjeto}";
        $conn->query($sql2);
    } else {
        $sql2 = "UPDATE kit SET disponible = 0 WHERE idKit = {$idKit}";
        $conn->query($sql2);
    }
}


mostrarDatos("prestado", "idPrestado", $idPrestado, $conn);
