<?php
session_start();
include "connection.php";
global $conn;

if (isset($_SESSION['email']) && $_SESSION['email'] != '' && isset($_SESSION['password']) && $_SESSION['password'] != '') {
    $email = $_SESSION['email'];
    $password = $_SESSION['password'];
} else if (isset($_POST["email"]) && $_POST["email"] != '' && isset($_POST["password"]) && $_POST["password"] != '') {
    $email = $_POST["email"];
    $password = $_POST["password"];
}else{
    exec("php ../apis/logout.php");
    header("login.php");
    exit();
}

    $sql = "SELECT * FROM usuario WHERE correoElectronico='" . $email . "'AND contrasena='" . $password . "'";
    $result = $conn->query($sql);
    echo $conn->error;

    if ($result->num_rows > 0) {
        return;
    } else {
        exec("php ../apis/logout.php");
        header("Location: login.php");
        exit();
    }

?>