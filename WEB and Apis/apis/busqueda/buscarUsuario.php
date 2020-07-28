<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\

if(isset($_POST["emailU"])&&isset($_POST["passwordU"])){
    $GLOBALS["emailU"]=$_POST["emailU"];
    $GLOBALS["passwordU"]=$_POST["passwordU"];
}
include "../../connection/checkLogin.php";
//-------------------------------------------------------\\

$busqueda="";

function anadirAConsultaTexto($nombre, $valor){
    global $busqueda;
    if(isset($_POST[$valor])&&$_POST[$valor]!=""){ 

        $valor=$_POST[$valor];
        echo $valor;
        if($busqueda==""){
            $busqueda=" {$nombre} LIKE '%{$valor}%'";
        }else{
            $busqueda=", {$nombre} LIKE '%{$valor}%'";
        }
    }
}
function anadirAConsultaNumero($nombre, $valor){
    global $busqueda;
    if(isset($_POST[$valor])&&$_POST[$valor]!=""){

        $valor=$_POST[$valor];
        
        if($busqueda==""){
            $busqueda=" {$nombre} = {$valor}";
        }else{
            $busqueda=", {$nombre} = $valor}";
        }
    }
}
//if(isset($_POST["name"])&&!empty($_POST["name"]))
//$busqueda="nombre LIKE '%".$_POST["name"]."%'";
anadirAConsultaTexto("nombre","name");
anadirAConsultaTexto("contrasena","password");
anadirAConsultaTexto("correoElectronico","email");
anadirAConsultaNumero("rango","rank");
anadirAConsultaTexto("departamento","department");
anadirAConsultaNumero("telefono","phone");


$sql = "SELECT * FROM usuario WHERE {$busqueda};";
echo $sql;
$result = $conn->query($sql);

$data=array();

echo $conn->error;
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[]= $row;
    }
    echo json_encode($data);
}else{
    echo "Fallo";
}



?>