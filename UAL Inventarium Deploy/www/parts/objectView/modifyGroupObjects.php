<!-- The modalGroupObject -->

<div id="ventanaFlotante" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <h5 class="font-weight-bold text-center">Modificar grupo de objetos</h5>
        <form id="formularioModificarGrupoObjetos">
        <br>
            <div class="form-group">
                <label class="font-weight-bold">Nombre</label>
                    <input type="text" class="form-control" id="nombreGO" name="nombre" placeholder="Nombre">
            </div>
            <div class="form-group">
                <label class="font-weight-bold">Marca</label>
                <input type="text" class="form-control" id="marcaGO" name="marca" placeholder="Marca">
            </div>
            <div class="form-group">
                <label class="font-weight-bold">Modelo</label>
                <input type="text" class="form-control" id="modeloGO" name="modelo" placeholder="Modelo">
            </div>
            <div class="form-group">
                <label class="font-weight-bold">Imagen</label>
                <input type="file" id="fotoGO" name="fotoGO" class="form-control-file" required>
            </div>
        </form>
        <br>
        <div class="btn-group">
            <button type="button" id="eliminarGO" class="btn btn-danger btn-block mx-3 my-1">Eliminar</button>
            <button type="button" id="modificarGO" class="btn btn-primary btn-block mx-3 my-1">Modificar</button>
        </div>


    </div>
</div>

<script>

    async function showModalModificarGrupoObjetos(dato) {
        var grupoObjetoAux = (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {
            idGrupoObjetos: dato
        }))[0];

        $("#nombreGO").val("");
        $("#marcaGO").val("");
        $("#modeloGO").val("");

        if (grupoObjetoAux.nombre != null) $("#nombreGO").val(grupoObjetoAux.nombre);
        if (grupoObjetoAux.marca != null) $("#marcaGO").val(grupoObjetoAux.marca);
        if (grupoObjetoAux.modelo != null) $("#modeloGO").val(grupoObjetoAux.modelo);

        $("#modificarGO").attr("onclick", "actualizarDatos(" + dato + ");");
        $("#ventanaFlotante").modal("show");
        $("#eliminarGO").attr("onclick", "eliminarDatos(" + dato + ");");
    }
</script>