<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$idUbicacion=$_POST["idUbicacion"];

$sql2 = "SELECT * FROM objeto WHERE Ubicacion_idUbicacion=".$idUbicacion.";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {
                
                $sql3 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row2["GrupoObjetos_idGrupoObjetos"].";";
                $result3 = $conn->query($sql3);
                if ($result3->num_rows > 0) {
                while($row3 = $result3->fetch_assoc()) {$nombreObjeto=$row3["nombre"];}}
            
                echo $nombreObjeto."-".$row2["idObjeto"].";";
            }
            exit();
        }

$sql="DELETE FROM ubicacion WHERE idUbicacion=".$idUbicacion.";";
$conn->query($sql);

?>