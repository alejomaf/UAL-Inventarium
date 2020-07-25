<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$idGrupoObjetos=$_POST["idGrupoObjetos"];


$sql = "SELECT * FROM objeto WHERE GrupoObjetos_idGrupoObjetos=".$idGrupoObjetos.";";
$result = $conn->query($sql);

echo $conn->error;

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $idObjeto=$row["idObjeto"];

        $sql="DELETE FROM configuracion WHERE Objeto_idObjeto=".$idObjeto.";";
        $conn->query($sql);
        
        $sql="DELETE FROM prestado WHERE Objeto_idObjeto=".$idObjeto.";";
        $conn->query($sql);
        
        $sql="DELETE FROM objeto WHERE idObjeto=".$idObjeto.";";
        $conn->query($sql);
    }
}

$sql="DELETE FROM grupoobjetos WHERE idGrupoObjetos=".$idGrupoObjetos.";";
$conn->query($sql);

?>