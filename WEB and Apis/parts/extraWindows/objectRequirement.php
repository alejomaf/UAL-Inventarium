<!-- The modalGroupObject -->

<div id="ventanaFlotante2" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li style="cursor:pointer" class="nav-item active" id="botonCrearSolicitud">
                        <a class="nav-link" onclick="switchBotones(false);">Solicitar objeto</a>
                    </li>
                    <li style="cursor:pointer" class="nav-item" id="botonSolicitudes">
                        <a class="nav-link" onclick="switchBotones(true);">Solicitudes</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="crearSolicitud">
            <h5>Crear solicitud</h5>
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Escriba el nombre completo de la persona que recibirá el objeto</label>
                    <input type="text" class="form-control" id="nombreS" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Fecha estimada de devolución del objeto</label>
                    <input type="date" class="form-control" id="fechaEstimadaS" placeholder="Marca">
                </div>
            </form>
            <div class="row d-flex justify-content center">
                <div class="col-md-5">
                    <button type="button" id="eliminarGO" class="btn btn-block btn-danger">Eliminar</button></div>
                <div class="col-md-5">
                    <button type="button" id="crearS" class="btn btn-block btn-primary">Crear</button></div>
            </div>
        </div>

        <div id="solicitudes">
            <h5>Solicitudes</h5>
            <div class="my-2"><h6>Préstamos activos</h6></div>
            <ul class="list-group" id="prestamosActivos">
            </ul>
            <div class="my-2"><h6>Solicitudes pendientes</h6></div>
            <ul class="list-group" id="solicitudesActivas">
            </ul>
        </div>


    </div>
</div>

<script>
    $("#realizarSolicitud").click(function() {
        showModal()
    });
    $("#solicitudes").hide();

    async function showModal2(dato) {
        await cargarDatosSolicitud(dato);
        $("#crearS").attr("onclick", "crearSolicitudes(" + dato + ");");
        $("#ventanaFlotante2").modal("show");
        //$("#eliminarGO").attr("onclick","eliminarObjeto("+dato+");"); 
    }

    function solicitudes() {
        if ($("#solicitudes").is(":visible")) return;
        $("#solicitudes").show();
        $("#crearSolicitud").hide();
    }

    function crearSolicitud() {
        if ($("#crearSolicitud").is(":visible")) return;
        $("#solicitudes").hide();
        $("#crearSolicitud").show();
    }

    async function cargarDatosSolicitud(dato) {
        $("#prestamosActivos").empty();
        $("#solicitudesActivas").empty();
        prestamosActivos = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
            Objeto_idObjeto: dato,
            estado: 0
        });
        if (prestamosActivos == null) await anadirObjetoSolicitud($("#prestamosActivos"), "No hay préstamos activos", "ANADIR ACCION");
        else {
            for (i = 0; i < prestamosActivos.length; i++) anadirObjetoSolicitud($("#prestamosActivos"), prestamosActivos[i].retiradoPor+" | Fecha estimada de entrega "+prestamosEspera[i].fechaEstimadaEntrega, "quitarModal($('#ventanaFlotante2'));location.hash='solicitud-"+prestamosEspera[i].idPrestado+"';");
        }
        prestamosEspera = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
            Objeto_idObjeto: dato,
            estado: -1
        });
        if (prestamosEspera == null) await anadirObjetoSolicitud($("#solicitudesActivas"), "No hay préstamos en espera", "ANADIR ACCION");
        else {
            for (i = 0; i < prestamosEspera.length; i++) anadirObjetoSolicitud($("#solicitudesActivas"), prestamosEspera[i].retiradoPor+" | Solicitado el "+prestamosEspera[i].solicitado, "quitarModal($('#ventanaFlotante2'));location.hash='solicitud-"+prestamosEspera[i].idPrestado+"';");
        }
    }

    async function anadirObjetoSolicitud(ubicacion, texto, accion) {
        var fila = document.createElement("li");
        fila.textContent = texto;
        fila.setAttribute("class", "list-group-item");
        fila.setAttribute("onclick", accion);
        await ubicacion.append(fila);
    }

    async function crearSolicitudes(dato) {
        if ($("#nombreS").val() == "") return;
        if ($("#fechaEstimadaS").val() == "") return;
        await realizarConsulta("apis/creacion/crearPrestamo.php", {
            fechaEstimadaEntrega: $("#fechaEstimadaS").val(),
            retiradoPor: $("#nombreS").val(),
            objeto: dato
        });
        await quitarModal($('#ventanaFlotante2'));
        cargarPagina();
    }

    function switchBotones(tipo) {
        if (tipo) {
            solicitudes();
            $('#botonSolicitudes').attr('class', 'nav-item active');
            $('#botonCrearSolicitud').attr('class', 'nav-item');
        } else {
            crearSolicitud();
            $('#botonSolicitudes').attr('class', 'nav-item');
            $('#botonCrearSolicitud').attr('class', 'nav-item active');
        }
    }
</script>