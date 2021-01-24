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
anadirACreacionNumero("imagen","imagen");
anadirACreacionTexto("observaciones","observaciones");

crearDatos("objetokit", $conn);
?>