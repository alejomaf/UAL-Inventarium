<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

eliminarDatos("objetokit", "idObjetoKit", $_POST["idObjetoKit"], $conn);

?>