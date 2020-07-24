<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../connection/checkLogin.php";
//-------------------------------------------------------\\

$plataforma=$_POST["plataforma"];

if(isset($_POST["name"])&&$_POST["name"]!=null){
    $name=" LIKE '%".$_POST["name"]."%'";
}else{
    $name="!=''";
}
if(isset($_POST["department"])&&$_POST["department"]!=null){
    $department="=".$_POST["department"];
}else{
    $department="!=-1";
}
if(isset($_POST["rank"])&&$_POST["rank"]!=null){
    $rank="=".$_POST["rank"];
}else{
    $rank="!=-2";
}
if(isset($_POST["email"])&&$_POST["email"]!=null){
    $email=" LIKE '%".$_POST["email"]."%'";
}else{
    $email="!='a'";
}

$sql = "SELECT * FROM usuario WHERE nombre".$name." AND departamento".$department." AND rango".$rank." AND correoElectronico".$email.";";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        if($plataforma==0){

            echo $row["idUsuario"].'/'.$row["nombre"].'/'.$row["correoElectronico"].'/'.$row["rango"].'/'.$row["departamento"].'/'.$row["telefono"].';';

        }else{

            echo $row["idUsuario"].'/'.$row["nombre"].'/'.$row["correoElectronico"].'/'.$row["rango"].'/'.$row["departamento"].'/'.$row["telefono"].';';
               
    }
}
}
?>