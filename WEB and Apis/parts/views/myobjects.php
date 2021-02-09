<table id="tablaMisPrestamos"class="table table-striped table-bordered">
    <thead class="thead-dark">
        <tr>
            <th scope="col">Nombre del objeto</th>
            <th scope="col">Estado</th>
        </tr>
    </thead>
    <tbody id="filas">
    </tbody>

    <script>
        var fechaActual = new Date("<?php echo date("Y-m-d"); ?>");
        var solicitudes = [];
        async function cargarSolicitudes() {
            solicitudes = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
                Usuario_idUsuario: "<?php session_start();
                                    echo $_SESSION["idUsuario"]; ?>"
            });
            if (solicitudes == null) {
                $("#tablaMisPrestamos").remove();
                aquiNoHayNada($("#insideContainer"));
                return;
            }
            for (k = solicitudes.length - 1; k >= 0; k--) {
                await anadirSolicitud(solicitudes[k]);
            }
        }
        async function anadirSolicitud(solicitud) {
            var fechaEstimadaEntrega = new Date(solicitud.fechaEstimadaEntrega);
            var fila = $(document.createElement('tr'));
            var nombre = $(document.createElement('th'));
            nombre.attr("scrope", "row");
            var estado = $(document.createElement('td'));
            grupoObjeto = (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {
                idGrupoObjetos: solicitud.Objeto_GrupoObjetos_idGrupoObjetos
            }))[0];
            nombre.text(grupoObjeto.nombre);

            switch (solicitud.estado) {
                case "-1":
                    estado.html("Pendiente de aprobación");
                    fila.attr("class", "table-warning");
                    break;
                case "0":
                    if (fechaEstimadaEntrega <= fechaActual) {
                        estado.html("Pendiente de devolución");
                        fila.attr("class", "table-danger");
                    } else {
                        estado.html("Activa");
                        fila.attr("class", "table-primary");
                    }
                    break;
                case "1":
                    estado.html("Finalizada");
                    fila.attr("class", "table-secondary");
                    break;
            }
            fila.append(nombre);
            fila.append(estado);
            fila.attr("style", "cursor:pointer;");
            fila.attr("onclick", "location.hash='#solicitud-" + solicitud.idPrestado + "'");
            $("#filas").append(fila);
        }
        cargarSolicitudes();
    </script>