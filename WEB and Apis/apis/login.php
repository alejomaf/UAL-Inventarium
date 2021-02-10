<?php

include "../connection/connection.php";

$email=$_POST["email"];
$password=$_POST["password"];
$plataforma=$_POST["plataforma"];


$sql = "SELECT * FROM usuario WHERE correoElectronico='".$email."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        if($row["rango"]==-1) {
            header("Location: ../login.php"); 
            exit();
        }
        
        if(password_verify($password,$row["contrasena"])||($row["idUsuario"]==1&&$password==$row["contrasena"])){

        if($plataforma==0){
            $_SESSION['idUsuario']=$row["idUsuario"];
            $_SESSION['email']=$row["correoElectronico"];
            $_SESSION['nombre']=$row["nombre"];
            $_SESSION['telefono']=$row["telefono"];
            $_SESSION['password']=$row["contrasena"];
            $_SESSION['rango']=$row["rango"];
            header("Location: ../user.php");
        }else{
            echo $row["idUsuario"].'/'.$row["nombre"].'/'.$row["correoElectronico"].'/'.$row["rango"].'/'.$row["departamento"].'/'.$row["telefono"].';';
        }
        
        }else {
            header("Location: ../login.php");
            exit();
        }

    }
}else header("Location: ../login.php");

            
?>