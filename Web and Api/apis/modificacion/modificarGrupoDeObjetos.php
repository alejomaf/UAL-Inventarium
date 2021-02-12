<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\
$modificacion="";
$imagenAnterior="";

$idGrupoObjetos=$_POST["idGrupoObjetos"];

$sql2 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos={$idGrupoObjetos};";
$result2 = $conn->query($sql2);
if ($result2->num_rows > 0) {
    while ($row2 = $result2->fetch_assoc()) {
        $imagenAnterior = $row2["imagen"];
    }
}
anadirAModificacionTexto("nombre", "nombre");
anadirAModificacionNumero("cantidad", "cantidad");
anadirAModificacionTexto("marca", "marca");
anadirAModificacionTexto("modelo", "modelo");
anadirAModificacionNumero("cantidadDisponible", "cantidadDisponible");
anadirAModificacionNumero("tipo", "tipo");
anadirAModificacionNumero("eliminado", "eliminado");

$target_dir = "../../images/objects/";
$target_file = $target_dir . basename($_FILES["fotoGO"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fotoGO"]["tmp_name"]);
    if ($check !== false) {
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
if ($_FILES["fotoGO"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
if (
    $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif"
) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
} else {
    $temp = explode(".", $_FILES["fotoGO"]["name"]);
    $newfilename = round(microtime(true)) . '.' . end($temp);
    $target_file = $target_dir . $newfilename;
    if (move_uploaded_file($_FILES["fotoGO"]["tmp_name"], $target_file)) {
        $imagen = $_FILES["fotoGO"]["name"];
        echo "The file " . basename($_FILES["fotoGO"]["name"]) . " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
    $modificacion = " imagen = '{$target_file}'";
    if($imagenAnterior!=null) unlink($imagenAnterior);
}

mostrarDatos("grupoobjetos", "idGrupoObjetos", $idGrupoObjetos, $conn);
?>