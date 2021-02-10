<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\
$modificacion="";

$idUsuario=$_POST["idUsuario"];

anadirAModificacionTexto("nombre", "name");
anadirAModificacionTexto("contrasena", "password");
anadirAModificacionTexto("correoElectronico", "email");
anadirAModificacionTexto("rango", "rank");
anadirAModificacionTexto("departamento", "department");
anadirAModificacionTexto("telefono", "phone");

if($_POST["rank"]==1){
    $sql2 = "SELECT * FROM usuario WHERE idUsuario=" . $idUsuario . ";";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
        while ($row2 = $result2->fetch_assoc()) {
            if($row2['rango']==-1){
                include "../mail/sendEmailDeAlta.php";
            }
        }
    }
}

mostrarDatos("usuario", "idUsuario", $idUsuario, $conn);
?>