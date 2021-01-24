<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idObjetoKit=$_POST["idObjetoKit"];

anadirAModificacionTexto("nombre","nombre");
anadirAModificacionTexto("cantidad","cantidad");
anadirAModificacionNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");
anadirAModificacionNumero("imagen","imagen");
anadirAModificacionTexto("observaciones","observaciones");

mostrarDatos("objetokit", "idObjetoKit", $idObjetoKit, $conn);
?>