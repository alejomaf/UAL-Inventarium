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
anadirAModificacionNumero("solicitado", "solicitado");
anadirAModificacionNumero("estado", "estado");

if($_POST["estado"]==0){
    $sql2="UPDATE objeto SET disponible = 0 WHERE idObjeto={$idObjeto}";
    $conn->query($sql2);

    $sql3= "SELECT * FROM objeto WHERE idObjeto={$idObjeto}";

    $result=$conn->query($sql3);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $idGrupoObjetos=$row["GrupoObjetos_idGrupoObjetos"];
        }
        $sql2="UPDATE grupoobjetos SET cantidadDisponible = cantidadDisponible - 1 WHERE idGrupoObjetos={$idGrupoObjetos}";
        $result=$conn->query($sql2);   
    }
}

if($_POST["estado"]==1){
    $sql2="UPDATE objeto SET disponible = 1 WHERE idObjeto={$idObjeto}";
    $conn->query($sql2);
    
    $sql3= "SELECT * FROM objeto WHERE idObjeto={$idObjeto}";

    $result=$conn->query($sql3);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $idGrupoObjetos=$row["GrupoObjetos_idGrupoObjetos"];
        }
        $sql2="UPDATE grupoobjetos SET cantidadDisponible = cantidadDisponible + 1 WHERE idGrupoObjetos={$idGrupoObjetos}";
        $result=$conn->query($sql2);   
    }
}

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