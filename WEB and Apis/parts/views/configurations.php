<div id="crearConfiguracion" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <h5>Crear configuración</h5>
        <a>Todos los valores son opcionales*</a>
        <br>
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">IP</label>
                <input type="text" class="form-control" id="ipObjeto" placeholder="Ingrese la dirección IP">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">MAC</label>
                <input type="text" class="form-control" id="macObjeto" placeholder="Ingrese la dirección MAC">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Boca</label>
                <input type="text" class="form-control" id="bocaObjeto" placeholder="Ingrese la boca de conexión">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Armario</label>
                <input type="text" class="form-control" id="armarioObjeto" placeholder="Ingrese el armario donde se ubica">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Usuario</label>
                <input type="text" class="form-control" id="usuarioObjeto" placeholder="Ingrese el usuario configurado">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Contraseña</label>
                <input type="text" class="form-control" id="contrasenaObjeto" placeholder="Ingrese la contraseña configurada">
            </div>
        </form>
        <div class="btn-group">
            <button type="button" id="botonModificarConfiguracion" class="btn btn-primary" onclick="if(idConfiguracion==null)crearConfiguracion();else modificarConfiguracion();"><span class="ui-button-text">Crear configuracion</span></button>
        </div>


    </div>
</div>
<div id="insideContainer" class="row justify-content-center"></div>
<script>
    var configuraciones = [];

    async function cargarConfiguraciones() {
        limpiarZona($("#insideContainer"));
        configuraciones = await realizarConsulta("apis/busqueda/buscarConfiguracion.php", null);

        if (configuraciones == null) {
            aquiNoHayNada($("#insideContainer"));
            return;
        }
        for (i = 0; i < configuraciones.length; i++) {
            anadirConfiguracion(configuraciones[i], i);
        }
    }

    async function anadirConfiguracion(configuracion, posicionC) {
        objeto = (await realizarConsulta("apis/busqueda/buscarObjeto.php", {
            idObjeto: configuracion.Objeto_idObjeto
        }))[0];
        grupoObjeto = (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {
            idGrupoObjetos: objeto.GrupoObjetos_idGrupoObjetos
        }))[0];

        var tituloGO = [];

        tituloGO.push(grupoObjeto.nombre);
        tituloGO.push("location.hash='#objeto-" + objeto.idObjeto + "';");

        var valores = [];

        if (configuracion.ip != null) valores.push("Dirección IP: " + configuracion.ip);
        if (configuracion.mac != null) valores.push("Dirección MAC: " + configuracion.mac);
        if (configuracion.boca != null) valores.push("Boca: " + configuracion.boca);
        if (configuracion.armario != null) valores.push("Armario: " + configuracion.armario);
        if (configuracion.usuario != null) valores.push("Usuario: " + configuracion.usuario);
        if (configuracion.contrasena != null) valores.push("Contraseña: " + configuracion.contrasena);

        var botones = {
            "Modificar configuración": "showModalModificar(" + posicionC + ");",
            "Eliminar configuración": "eliminarConfiguracion(configuracion.idConfiguracion);"
        };
        var titulo = ["Configuración", null];


        insertCard($("#insideContainer"), "images/objects/" + await grupoObjeto.imagen, tituloGO, valores, botones, null, 22);
    }

    function showModalModificar(id) {
        if (configuraciones[id].ip != null) $("#ipObjeto").val(configuraciones[id].ip);
        if (configuraciones[id].mac != null) $("#macObjeto").val(configuraciones[id].mac);
        if (configuraciones[id].boca != null) $("#bocaObjeto").val(configuraciones[id].boca);
        if (configuraciones[id].armario != null) $("#armarioObjeto").val(configuraciones[id].armario);
        if (configuraciones[id].usuario != null) $("#usuarioObjeto").val(configuraciones[id].usuario);
        if (configuraciones[id].contrasena != null) $("#contrasenaObjeto").val(configuraciones[id].contrasena);

        $("#botonModificarConfiguracion").attr("onclick", "modificarConfiguracion(" + id + ")");
        $("#crearConfiguracion span").text("Modificar configuración");
        $("#crearConfiguracion").modal("show");
    }

    async function modificarConfiguracion(id) {
        if ($('#macObjeto').val() == "" && $('#bocaObjeto').val() == "" && $('#armarioObjeto').val() == "" && $('#usuarioObjeto').val() == "" && $('#ipObjeto').val() == "") return;
        await realizarConsulta("apis/modificacion/modificarConfiguracion.php", {
            ip: $("#ipObjeto").val(),
            mac: $("#macObjeto").val(),
            boca: $("#bocaObjeto").val(),
            armario: $("#armarioObjeto").val(),
            usuario: $("#usuarioObjeto").val(),
            contrasena: $("#contrasenaObjeto").val(),
            idConfiguracion: configuraciones[id].idConfiguracion
        });
        $("#crearConfiguracion").modal("hide");
        cargarPagina();
    }

    async function eliminarConfiguracion(idConfiguracion) {
        await realizarConsulta("apis/eliminacion/eliminarConfiguracion.php", {
            idConfiguracion: idConfiguracion
        });
        $("#crearConfiguracion").modal("hide");
        cargarPagina();
    }

    cargarConfiguraciones();
</script>