<?php

include "../../connection/connection.php";

//Verifica la dirección de correo electrónico de un usuario
if (isset($_GET["verify"])) {
    $sql3 = "SELECT * FROM usuario WHERE contrasena='{$_GET["verify"]}'";

    $result = $conn->query($sql3);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $sql2="UPDATE usuario SET rango = -1 WHERE idUsuario = {$row["idUsuario"]}";
            echo "hola, verificado";
            $result = $conn->query($sql2);
            return;
        }
    }
}else{


$name = $_POST["name"];
$passwordAux = $_POST["password"];
$email = $_POST["email"];
$department = $_POST["department"];
$phone = $_POST["phone"];
$password = password_hash($passwordAux, PASSWORD_BCRYPT);
$sql = "INSERT INTO usuario(nombre, contrasena, correoElectronico, rango, departamento, telefono) VALUES ('" . $name . "','" . $password . "','" . $email . "',-2," . $department . "," . $phone . ");";

$idVerificacion = $password;

$conn->query($sql);
echo $conn->error;
include "../mail/sendEmail.php";
}