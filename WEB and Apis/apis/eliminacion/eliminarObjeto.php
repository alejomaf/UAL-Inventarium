<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idObjeto=$_POST["idObjeto"];

eliminarDatos("configuracion", "Objeto_idObjeto", $idObjeto, $conn);
eliminarDatos("prestado", "Objeto_idObjeto", $idObjeto, $conn);
eliminarDatos("objeto", "idObjeto", $idObjeto, $conn);

?>