<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idPrestado=$_POST["idPrestado"];

anadirAModificacionTexto("retiradoPor", "retiradoPor");
anadirAModificacionTexto("fechaSalida", "fechaSalida");
anadirAModificacionTexto("fechaEntrega", "fechaEntrega");
anadirAModificacionTexto("fechaEstimadaEntrega", "fechaEstimadaEntrega");
anadirAModificacionNumero("Usuario_idUsuario", "idUsuario");
anadirAModificacionNumero("Objeto_idObjeto", "idObjeto");

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
    
mostrarDatos("prestado", "idPrestado", $idPrestado, $conn);
?>