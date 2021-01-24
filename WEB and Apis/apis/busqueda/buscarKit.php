<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\
$busqueda="";

anadirAConsultaNumero("idObjetoKit","idObjetoKit");
anadirAConsultaTexto("nombre","nombre");
anadirAConsultaTexto("cantidad","cantidad");
anadirAConsultaNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");
anadirAConsultaNumero("imagen","imagen");
anadirAConsultaTexto("observaciones","observaciones");
anadirAConsultaNumero("eliminado","eliminado");

mostrarDatos("kit", $busqueda, $conn);
?>