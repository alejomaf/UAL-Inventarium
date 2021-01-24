<div id="insideContainer" class="row justify-content-center">
</div>

<script>
    var solicitudes = [];
    var solicitudesActivas = [];
    var solicitudesAuxiliares = [];
    var solicitudesUsuarios = [];
    var solicitudesExpiradas = [];

    var rango = "<?php session_start();
                    echo $_SESSION['rango']; ?>";

    if (rango == 0) vistaAdministrador();
    else vistaUsuario();


    function solicitudApta(solicitud) {
        if (solicitudesAuxiliares.length != 0) {
            for (var pos in solicitudesAuxiliares) {
                if (solicitudesAuxiliares[pos].hasOwnProperty('Objeto_idObjeto')) {
                    if (solicitudesAuxiliares[pos].Objeto_idObjeto == solicitud.Objeto_idObjeto) return false;
                } else if (solicitudesAuxiliares[pos].Kit.idKit == solicitud.Kit_idKit) return false;
            }
        }
        if (solicitudesActivas != null) {
            for (var pos in solicitudesActivas) {
                if ('Objeto_idObjeto' in solicitudesActivas[pos]) {
                    if (solicitudesActivas[pos].Objeto_idObjeto == solicitud.Objeto_idObjeto) return false;
                } else
                if (solicitudesActivas[pos].Kit.idKit == solicitud.Kit_idKit) return false;
            }
        }

        return true;
    }
    var fechaActual = new Date("<?php echo date("Y-m-d"); ?>");
    async function vistaAdministrador() {
        solicitudesUsuarios = await realizarConsulta("apis/busqueda/buscarUsuario.php", {
            rank: -1
        });
        solicitudes = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
            estado: -1
        });
        solicitudesActivas = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
            estado: 0
        });
        for (k = 0; k < solicitudes.length; k++) {
            if (solicitudApta(solicitudes[k])) {
                await solicitudesAuxiliares.push(solicitudes[k]);
            }
            var fechaEstimadaEntrega = new Date(solicitudes[k].fechaEstimadaEntrega);

            if (fechaEstimadaEntrega <= fechaActual) {
                solicitudesExpiradas.push(solicitudes[k]);
            }
        }
        for (k = 0; k < solicitudesActivas.length; k++) {
            var fechaEstimadaEntrega = new Date(solicitudesActivas[k].fechaEstimadaEntrega);

            if (fechaEstimadaEntrega <= fechaActual) {
                solicitudesExpiradas.push(solicitudesActivas[k]);
            }
        }
        //insertCardLink(ubicacion, tituloBoton, enlace, imagen, numero)

        //Solicitudes de objetos pendientes
        if (solicitudesAuxiliares.length != 0) {
            insertCardLink($("#insideContainer"), "Solicitudes de objetos", "#solicitudes-objetos-pendientes", "fa fa-hand-paper-o", solicitudesAuxiliares.length);
        }

        //Solicitudes de registros de usuarios
        if (solicitudesUsuarios != null) {
            insertCardLink($("#insideContainer"), "Solicitudes de registros de usuario", "#solicitudes-usuarios", "fa fa-user-plus", solicitudesUsuarios.length);
        }

        //Préstamos expirados
        if (solicitudesExpiradas.length != 0) {
            insertCardLink($("#insideContainer"), "Préstamos expirados", "#solicitudes-objetos-prestados", "fa fa-calendar-times-o", solicitudesExpiradas.length);
        }

        //Equipos configurados
        insertCardLink($("#insideContainer"), "Equipos configurados", "#equiposConfigurados", "fa fa-laptop", null);

        //Buscar objetos
        insertCardLink($("#insideContainer"), "Buscar objetos", "#gobjetos", "fa fa-object-group", null);

        //Solicitud de ampliación de préstamo!!! HACER

    }

    async function vistaUsuario() {
        solicitudes = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
            estado: 0,
            Usuario_idUsuario: "<?php echo $_SESSION["idUsuario"]; ?>"
        });
        if (solicitudes != null) {
            var contador=0;
            for(pos in solicitudes){
                var fechaEstimadaEntrega = new Date(solicitudes[pos].fechaEstimadaEntrega);
                if (fechaEstimadaEntrega <= fechaActual) {
                        contador++;
                    } 
            }
        }
        if(contador!=0){
          //Préstamos pendientes de entrega
        insertCardLink($("#insideContainer"), "Préstamos pendientes de devolución", "#misprestamos", "fa fa-calendar-times-o", contador);  
        }
        //Buscar objetos
        insertCardLink($("#insideContainer"), "Buscar objetos", "#gobjetos", "fa fa-object-group", null);
        //Mis préstamos
        insertCardLink($("#insideContainer"), "Mis préstamos", "#misprestamos", "fa fa-list", null);
    }
</script>