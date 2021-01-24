<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idKit=$_POST["idKit"];

$sql3= "SELECT * FROM kit WHERE idKit={$idKit}";

$result=$conn->query($sql3);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $idGrupoObjetos=$row["GrupoObjetos_idGrupoObjetos"];
    }
    $sql2="UPDATE grupoobjetos SET cantidad = cantidad - 1, cantidadDisponible = cantidadDisponible - 1 WHERE idGrupoObjetos={$idGrupoObjetos}";
    $result=$conn->query($sql2);   
}

eliminarDatos("configuracion", "Kit_idKit", $idKit, $conn);
eliminarDatos("prestado", "Kit_idKit", $idKit, $conn);
eliminarDatos("kit", "idKit", $idKit, $conn);




?>