<?php session_start(); ?>
<!-- The modalGroupObject -->

<div id="modificarUsuarioModal" class="modal">
    <!-- Modal content -->
        <div class="modal-content">
        <h5>Modificar usuario</h5>
        <br>
        <form id="modificarUsuarioForm">
            <div class="form-group">
            <label>Nombre completo</label>
            <input type="text" name="name" class="form-control" id="nombreU" aria-describedby="nameHelp" placeholder="Ingrese su nombre completo" required>
        </div>
        <div class="form-group">
            <label>Departamento</label>
            <select class="form-control" name="departamento" id="departamentoU">
                <option value=0>Departamento de informática</option>
                <option value=1>Ingeniería de sistemas y automática</option>
                <option value=2>Lenguaje y sistemas informáticos</option>
                <option value=3>Ciencias de la computación e inteligencia artificial</option>
                <option value=4>Arquitectura y tecnología de computadores</option>
            </select>
        </div>
        <div class="form-group">
            <label>Número de teléfono</label>
            <input type="number" name="phone" class="form-control" id="numeroU" placeholder="Ingrese su número de teléfono" required>
        </div>
        </form>
        <div class="btn-group my-4">
            <p type="button" id="cancelarU" onclick="quitarModal($('#modificarUsuarioModal'));" class="btn btn-secondary btn-block mx-3 my-1">Cancelar</p>
            <p type="button" id="modificarU" onclick="actualizarUsuario();" class="btn btn-primary btn-block mx-3 my-1">Modificar</p>
        </div>


    </div>
</div>

<script>
    var idUsuario;
    async function showModalModificarUsuario() {

        if(aux!=-1){
            var usuario = (await realizarConsulta("apis/busqueda/buscarUsuario.php", {
                idUsuario: aux
            }))[0];
            idUsuario = aux;
        }else{
            var usuario = (await realizarConsulta("apis/busqueda/buscarUsuario.php", {
                idUsuario: <?php echo $_SESSION["idUsuario"]?>
            }))[0];
            idUsuario=<?php echo $_SESSION["idUsuario"]?>;
        }

        $("#nombreU").val(usuario.nombre);
        $("#departamentoU").val(usuario.departamento);
        $("#numeroU").val(usuario.telefono);

        $("#modificarUsuarioModal").modal("show");
    }

    async function actualizarUsuario() {
        if($("#nombreU")==""||$("#numeroU")=="") return;
        await realizarConsulta("apis/modificacion/modificarUsuario.php", {idUsuario: idUsuario, name: $("#nombreU").val(), department: $("#departamentoU").val(), phone:$("#numeroU").val()});

        quitarModal($("#modificarUsuarioModal"));
        cargarPagina();
    }

</script>