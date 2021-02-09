<!-- The modalGroupObject -->

<div id="modificarObjetoModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <h5>Modificar objeto</h5>
        <br>
        <form id="modificarObjetoForm">
            <div id="codigoOEsInventario" class="col-md-12 mb-3">
                <label>Código</label>
                <input type="text" name="codigo" class="form-control" id="codigoO" placeholder="Código">
            </div>

            <div class="col-md-12 mb-3">
                <label>Mejoras del equipo</label>
                <input type="text" name="mejorasEquipo" class="form-control" id="mejorasDelEquipoO" placeholder="Mejoras del equipo">
            </div>

            <div class="col-md-12 mb-3">
                <label>Etiqueta</label>
                <input type="text" id="etiquetaO" name="etiqueta" placeholder="Etiqueta del equipo" class="form-control">
            </div>

            <div class="col-md-12 mb-3">
                <select class="form-control" name="organizativa" id="organizativaO">
                    <option value=0>Departamento de informática</option>
                    <option value=1>Ingeniería de sistemas y automática</option>
                    <option value=2>Lenguaje y sistemas informáticos</option>
                    <option value=3>Ciencias de la computación e inteligencia artificial</option>
                    <option value=4>Arquitectura y tecnología de computadores</option>
                </select>
            </div>

            <div class="col-md-12 mb-3">
                <label>Observaciones</label>
                <input type="text" id="observacionesO" name="observaciones" placeholder="Observaciones del equipo" class="form-control">
            </div>


            <button id="botonEscrito" type="button" class="btn btn-block btn-secondary" onclick="cargarEdificios(); $('#myModal').modal('show');" placeholder="Ubicación" required>Seleccionar ubicación</button>
            <input id="botonValor" value=-1 type="hidden" name="ubicacion" required>
            <?php include "../../extraWindows/selectUbication.php"; ?>
        </form>
        <div class="btn-group my-4">
            <button type="button" id="eliminarO" class="btn btn-danger btn-block">Eliminar</button>
            <button type="button" class="btn btn-secondary" style="visibility:hidden"></button>
            <button type="button" id="modificarO" class="btn btn-primary btn-block">Modificar</button>
        </div>


    </div>
</div>

<script>
    async function showModalModificarObjeto(idObjeto) {
        if (grupoObjeto.tipo != 0) $("#codigoOEsInventario").hide();
        var objetoModificar = (await realizarConsulta("apis/busqueda/buscarObjeto.php", {
            idObjeto: idObjeto
        }))[0];

        var objetoUbicacion = (await realizarConsulta("apis/busqueda/buscarUbicacion.php", {
            idUbicacion: objetoModificar.Ubicacion_idUbicacion
        }))[0];

        $("#codigoO").val("");
        $("#mejorasDelEquipoO").val("");
        $("#etiquetaO").val("");
        $("#observacionesO").val("");

        $("#modificarGO").attr("onclick", "actualizarDatos(" + idObjeto + ");");
        $("#modificarObjetoModal").modal("show");
        $("#eliminarGO").attr("onclick", "eliminarDatos(" + idObjeto + ");");

        $("#codigoO").val(objetoModificar.codigo);
        $("#mejorasDelEquipoO").val(objetoModificar.mejorasEquipo);
        $("#etiquetaO").val(objetoModificar.etiqueta);
        $("#observacionesO").val(objetoModificar.observaciones);
        $("#organizativaO").val(objetoModificar.organizativa);

        $("#botonEscrito").html(getUbicacionTexto(objetoUbicacion));
        $("#botonValor").val(idObjeto.Ubicacion_idUbicacion);

        $("#eliminarO").attr("onclick","eliminarObjeto("+idObjeto+");");
        $("#modificarO").attr("onclick","actualizarObjeto("+idObjeto+");");
    }

    async function actualizarObjeto(idObjeto) {
        var form_data = new FormData(document.getElementById("modificarObjetoForm"));
        form_data.append("idObjeto", idObjeto);

        await $.ajax({
            url: "apis/modificacion/modificarObjeto.php",
            type: 'POST',
            data: form_data,
            cache: false,
            processData: false, // tell jQuery not to process the data
            contentType: false,
            success: function(resp) {}
        });

        quitarModal($("#modificarObjetoModal"));
        cargarPagina();
    }

    async function eliminarObjeto(idObjeto) {
        await realizarConsulta("apis/eliminacion/eliminarObjeto.php", {
            idObjeto: idObjeto
        });
        quitarModal($("#modificarObjetoModal"));
        cargarPagina();
    }
</script>