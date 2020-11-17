<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";

anadirAConsultaTexto("idObjeto","idObjeto");
anadirAConsultaTexto("mejorasEquipo","mejorasEquipo");
anadirAConsultaNumero("codigo","codigo");
anadirAConsultaNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");
anadirAConsultaNumero("Ubicacion_idUbicacion","Ubicacion_idUbicacion");
anadirAConsultaNumero("disponible","disponible");
anadirAConsultaNumero("eliminado","eliminado");

mostrarDatos("objeto", $busqueda, $conn);
?>