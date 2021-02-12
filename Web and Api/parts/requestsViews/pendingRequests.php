<script>
    var solicitudes = [];
    var solicitudesActivas = [];
    var solicitudesAuxiliares = [];

    async function concederPrestamo(id) {
        await realizarConsulta("apis/modificacion/modificarPrestamo.php", {
            idPrestado: id,
            fechaSalida: "<?php echo date("Y-m-d"); ?>",
            estado: 0
        });
        cargarPagina();
    }
    async function eliminarSolicitud(id) {
        await realizarConsulta("apis/modificacion/modificarPrestamo.php", {
            idPrestado: id,
            fechaSalida: "<?php echo date("Y-m-d"); ?>",
            fechaEntrega: "<?php echo date("Y-m-d"); ?>",
            estado: 2
        });
        cargarPagina();
    }

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

    async function cargarSolicitudes() {
        solicitudes = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
            estado: -1
        });
        solicitudesActivas = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
            estado: 0
        });

        if (solicitudes == null) {
            aquiNoHayNada($("#variableArea"));
            return;
        }
        for (k = 0; k < solicitudes.length; k++) {
            if (solicitudApta(solicitudes[k])) {
                await solicitudesAuxiliares.push(solicitudes[k]);
                await anadirSolicitud(solicitudes[k]);
            }
        }
        if ($("#variableArea").children().length==1){
            aquiNoHayNada($("#variableArea"));
        }
    }

    async function anadirSolicitud(solicitud) {
        if (solicitud.Objeto_idObjeto != null)
            objeto = (await realizarConsulta("apis/busqueda/buscarObjeto.php", {
                idObjeto: solicitud.Objeto_idObjeto
            }))[0];
        grupoObjeto = (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {
            idGrupoObjetos: solicitud.Objeto_GrupoObjetos_idGrupoObjetos
        }))[0];
        usuario = (await realizarConsulta("apis/busqueda/buscarUsuario.php", {
            idUsuario: solicitud.Usuario_idUsuario
        }))[0];

        filas = [];

        if (grupoObjeto.tipo == 0) {
            filas.push("Código: " + objeto.codigo);
            tipoObjeto = "Inventario";
        } else if (grupoObjeto.tipo == 1) {
            tipoObjeto = "Fungible";
        } else {
            tipoObjeto = "Kit";
        }

        filas.push("Objeto destinado a: " + solicitud.retiradoPor);
        filas.push("Solicitado por: " + usuario.nombre);
        filas.push("Fecha estimada de entrega: " + solicitud.fechaEstimadaEntrega);

        if (grupoObjeto.marca != "") filas.push("Marca: " + grupoObjeto.marca);
        if (grupoObjeto.modelo != "") filas.push("Modelo: " + grupoObjeto.modelo);
        if (objeto.mejorasEquipo != "") filas.push("Mejoras del equipo: " + objeto.mejorasEquipo);

        insertCard($("#variableArea"), "images/objects/" + grupoObjeto.imagen, [grupoObjeto.nombre, "location.hash='#solicitud-" + solicitud.idPrestado + "';"], filas, {
            "Eliminar solicitud": "eliminarSolicitud('" + solicitud.idGrupoObjetos + "');",
            "Conceder préstamos": "concederPrestamo('" + solicitud.idPrestado + "');"
        }, tipoObjeto,22);
    }

    cargarSolicitudes();
</script>