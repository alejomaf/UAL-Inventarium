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
            $_SESSION['email']=$row["correoElectronico"];
            $_SESSION['password']=$row["contrasena"];
            header("Location: ../index.php");
        }else{
            echo $row["idUsuario"].'/'.$row["nombre"].'/'.$row["correoElectronico"].'/'.$row["rango"].'/'.$row["departamento"].'/'.$row["telefono"].';';
        }
        }else echo "usuarioIncorrecto";

    }
}else echo "noExiste";

            
?>