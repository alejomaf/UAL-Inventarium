<script>


insertCard($("#variableArea"), "images/essentials/inventario.png", null, null, {"Préstamos y solicitudes de objetos":"location.hash='#solicitudes-objetos';"},null);
insertCard($("#variableArea"), "images/essentials/inventario.png", null, null, {"Solicitudes de registros de usuarios":"location.hash='#solicitudes-usuarios';"},null);

function seleccionarSolicitud(tipo){
    if(tipo==0) cambiarObjeto("parts/requirements/objectRequirements.php");
    else cambiarObjeto("parts/requirements/userRequirements.php");
}

function seleccionarTipoSolicitud(tipo){
    if(tipo==0) cambiarObjeto("parts/requirements/pendingRequests.php");
    else cambiarObjeto("parts/requirements/requests.php");
}

</script>