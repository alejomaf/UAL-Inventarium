<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\
$busqueda="";

anadirAConsultaNumero("idKit","idKit");
anadirAConsultaTexto("disponible","disponible");
anadirAConsultaTexto("Ubicacion_idUbicacion","Ubicacion_idUbicacion");
anadirAConsultaNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");

mostrarDatos("objetokit", $busqueda, $conn);
?>