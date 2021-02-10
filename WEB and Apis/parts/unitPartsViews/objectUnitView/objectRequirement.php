<!-- The modalGroupObject -->

<div id="crearSolicitudModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">

        <h5 class="text-center font-weight-bold">Crear solicitud</h5>
        <br>
        <form>
            <div class="form-group">
                <label>Escriba el nombre completo de la persona que recibirá el objeto</label>
                <input type="text" class="form-control" id="nombreS" placeholder="Nombre">
            </div>
            <div class="form-group">
                <label>Fecha estimada de devolución del objeto</label>
                <input type="date" class="form-control" id="fechaEstimadaS" placeholder="Marca">
            </div>
            <div class="modal-footer">
                <button type="button" id="cancelarS" onclick="quitarModal($('#crearSolicitudModal'));" class="btn btn-block btn-secondary mx-3 my-1">Cancelar</button>
                <button type="button" id="crearS" onclick="crearSolicitud();" class="btn btn-block btn-primary mx-3 my-1">Crear</button>
            </div>
        </form>

    </div>
</div>

<script>
    var fechaActual = new Date("<?php echo date("Y-m-d"); ?>");
    async function mostrarCrearSolicitudObjeto() {
        $("#crearSolicitudModal").modal("show");
    }

    async function anadirObjetoSolicitud(ubicacion, texto, accion) {
        var fila = document.createElement("li");
        fila.textContent = texto;
        fila.setAttribute("class", "list-group-item");
        fila.setAttribute("onclick", accion);
        await ubicacion.append(fila);
    }

    var divAlert = true;
    var divAlertFecha = true;

    async function crearSolicitud() {
        if ($("#nombreS").val() == "" || $("#fechaEstimadaS").val() == "") {
            if (divAlert) {
                addDivAlert($("#crearSolicitudModal .modal-content"), "Debe añadir el nombre completo de la persona que recibirá el objeto y la fecha estimada en que lo devolverá", "primary");
                divAlert = false;
            }
            return;
        }
        var fechaEstimadaAux = new Date($("#fechaEstimadaS").val());
        if (fechaEstimadaAux < fechaActual) {
            if (divAlertFecha) {
                addDivAlert($("#crearSolicitudModal .modal-content"), "La fecha de devolución no puede ser posterior a la actual", "primary");
                divAlertFecha = false;
            }
            return;
        }

        await realizarConsulta("apis/creacion/crearPrestamo.php", {
            fechaEstimadaEntrega: $("#fechaEstimadaS").val(),
            retiradoPor: $("#nombreS").val(),
            objeto: aux
        });

        await quitarModal($('#crearSolicitudModal'));
        cargarPagina();
    }
</script>