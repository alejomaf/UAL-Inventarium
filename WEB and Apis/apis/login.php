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
        
        $date = date("Y-m-d");

        // $stmt = null;
        // $sql="INSERT INTO mydb.keys(token, rango, fechaCaducidad) VALUES ('".$token."','".$row["rango"]."',CURDATE());";
        // $sql1="UPDATE mydb.keys SET fechaCaducidad = DATE_ADD(fechaCaducidad ,INTERVAL 10 DAY) WHERE fechaCaducidad = CURDATE();";
        // $conn->query($sql);
        // $conn->query($sql1);

        if($plataforma==0){
            $_SESSION['email']=$row["correoElectronico"];
            $_SESSION['password']=$row["contrasena"];
            header("Location: ../index.php");
        }else{
            echo    
'<pre style="word-wrap: break-word; white-space: pre-wrap;">
[
    {
        "idUsuario": '.$row["idUsuario"].'",
        "name": "'.$row["nombre"].'",
        "correoElectronico": "'.$row["correoElectronico"].'",
        "rango": '.$row["rango"].',
        "departamento": '.$row["departamento"].',
        "telefono": '.$row["telefono"].'
    }
]
</pre>';
}
        }
        else{
        echo
'<pre style="word-wrap: break-word; white-space: pre-wrap;">
[
    {
        "idUsuario": -1,
        "name": "a",
        "correoElectronico": "a",
        "rango": -2,
        "departamento": -1,
        "telefono": 0
    }
]
</pre>';;
        }
    }
  } else {
    echo    
'[
    {
        "idUsuario": -1,
        "name": "a",
        "correoElectronico": "a",
        "rango": -2,
        "departamento": -1,
        "telefono": 0
    }
]';
  }

?>