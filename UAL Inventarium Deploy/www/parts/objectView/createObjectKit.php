<!-- The modalGroupObject -->

<div id="crearObjetoKit" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <h5>Crear objeto del kit</h5>
        <br>
        <form id="formObjetoKit">
            <div class="form-group">
                <label>Nombre*</label>
                <input name="nombre" type="text" class="form-control" id="nombreObjetoKit" placeholder="Ingrese el nombre del objeto">
            </div>
            <div class="form-group">
                <label>Cantidad*</label>
                <input name="cantidad" type="number" value="1" class="form-control" id="cantidadObjetoKit">
            </div>
            <div class="form-group">
                <label>Imagen</label>
                <input type="file" id="fotoObjetoKit" name="fotoObjetoKit" class="form-control-file" required>
            </div>
            <div class="form-group">
                <label>Observaciones</label>
                <input name="observaciones" type="text" class="form-control" id="observacionesObjetoKit" placeholder="Ingrese las observaciones del objeto">
            </div>
        </form>
        <div class="btn-group">
            <button type="button" id="crearObjetoKitButton" class="btn btn-primary"><span class="ui-button-text">Crear objeto del kit</span></button>
        </div>


    </div>
</div>

<script>
    var idObjetoKit = null;

    function showModalCrearObjetoDelKit() {
        $("#nombreObjetoKit").val("");
        $("#cantidadObjetoKit").val(0);
        $("#imagenObjetoKit").val("");
        $("#observacionesObjetoKit").val("");

        $("#crearObjetoKitButton").attr("onclick", "crearObjetoKit()");
        $("#crearObjetoKit").modal("show");
    }

    async function showModalModificarObjetoKit(idObjetoKit) {
        var objetoKit = (await realizarConsulta("apis/busqueda/buscarObjetoKit.php", {
            idObjetoKit: idObjetoKit
        }))[0];

        $("#nombreObjetoKit").val("");
        $("#cantidadObjetoKit").val(0);
        $("#imagenObjetoKit").val("");
        $("#observacionesObjetoKit").val("");

        if (objetoKit.nombre != null) $("#nombreObjetoKit").val(objetoKit.nombre);
        if (objetoKit.cantidad != null) $("#cantidadObjetoKit").val(objetoKit.cantidad);
        if (objetoKit.observaciones != null) $("#observacionesObjetoKit").val(objetoKit.observaciones);

        $("#crearObjetoKit span").text("Modificar configuración");
        $("#crearObjetoKitButton").attr("onclick", "modificarObjetoKit(" + idObjetoKit + ")");
        $("#crearObjetoKit").modal("show");
    }

    async function crearObjetoKit() {
        if ($('#nombreObjetoKit').val() == "" && $("#cantidadObjetoKit").val() >= 1) return;

        var form_data = new FormData(document.getElementById("formObjetoKit"));
        form_data.append("GrupoObjetos_idGrupoObjetos", grupoObjeto.idGrupoObjetos);

        await $.ajax({
            url: "apis/creacion/crearObjetoKit.php",
            type: 'POST',
            data: form_data,
            cache: false,
            processData: false, // tell jQuery not to process the data
            contentType: false,
            success: function(resp) {
                console.log(resp);
            }
        });

        quitarModal($("#crearObjetoKit"));
        //cargarPagina();
    }

    async function modificarObjetoKit(idObjetoKit) {
        if ($('#nombreObjetoKit').val() == "" && $("#cantidadObjetoKit").val() >= 1) return;

        var form_data = new FormData(document.getElementById("formObjetoKit"));
        form_data.append("GrupoObjetos_idGrupoObjetos", grupoObjeto.idGrupoObjetos);
        form_data.append("idObjetoKit", idObjetoKit);

        if ($("#fotoObjetoKitButton").val() == "") form_data.remove("fotoObjetoKit");

        await $.ajax({
            url: "apis/modificacion/modificarObjetoKit.php",
            type: 'POST',
            data: form_data,
            cache: false,
            processData: false, // tell jQuery not to process the data
            contentType: false,
            success: function(resp) {}
        });

        quitarModal($("#crearObjetoKit"));
        cargarPagina();
    }

    async function eliminarObjetoKit(idObjetoKit) {
        await realizarConsulta("apis/eliminacion/eliminarObjetoKit.php", {
            idObjetoKit: idObjetoKit
        });
        quitarModal($("#crearObjetoKit"));
        cargarPagina();
    }
</script>