<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\
global $creacion;
global $variables;

anadirACreacionTexto("nombre","nombre");
anadirACreacionTexto("cantidad","cantidad");
anadirACreacionNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");
anadirACreacionTexto("observaciones","observaciones");


$target_dir = "../../images/objectsKit/";
$target_file = $target_dir . basename($_FILES["fotoObjetoKit"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fotoObjetoKit"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
  }
  
  // Check file size
  if ($_FILES["fotoObjetoKit"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
  }
  
  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
  }
  // Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else {
    $temp = explode(".", $_FILES["fotoObjetoKit"]["name"]);
    $newfilename = round(microtime(true)) . '.' . end($temp);
    $target_file = $target_dir . $newfilename;
    if (move_uploaded_file($_FILES["fotoObjetoKit"]["tmp_name"], $target_file)) {
        $imagen=$_FILES["fotoObjetoKit"]["name"];
      echo "The file ". basename( $_FILES["fotoObjetoKit"]["name"]). " has been uploaded.";
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
    $variables.=", imagen";
    $creacion.=", '{$newfilename}'";
  }





crearDatos("objetokit", $conn);
?>