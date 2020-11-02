<?php

include "../connection/connection.php";

$email=$_POST["email"];
$password=$_POST["password"];
$plataforma=$_POST["plataforma"];


$sql = "SELECT * FROM usuario WHERE correoElectronico='".$email."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        if($row["contrasena"]==$password){

        if($plataforma==0){
            $_SESSION['idUsuario']=$row["idUsuario"];
            $_SESSION['email']=$row["correoElectronico"];
            $_SESSION['password']=$row["contrasena"];
            $_SESSION['rango']=$row["rango"];
            header("Location: ../user.php");
        }else{
            echo $row["idUsuario"].'/'.$row["nombre"].'/'.$row["correoElectronico"].'/'.$row["rango"].'/'.$row["departamento"].'/'.$row["telefono"].';';
        }
        }else header("Location: login.php");

    }
}else header("Location: login.php");

            
?>