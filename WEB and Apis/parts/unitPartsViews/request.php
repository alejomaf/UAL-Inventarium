<div class="row justify-content-center">
  <div id="insideContainer" class="row"></div>
</div>

<script>
  var solicitudes = [];

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
  async function enviarRecordatorio(id) {

  }
  
  async function finalizarPrestamo(id) {
    await realizarConsulta("apis/modificacion/modificarPrestamo.php", {
      idPrestado: id,
      fechaEntrega: "<?php echo date("Y-m-d"); ?>",
      estado: 1
    });
    cargarPagina();
  }

  async function cargarSolicitudes() {
    solicitudes = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
      idPrestado: aux
    });
    for (i = 0; i < solicitudes.length; i++) {
      await anadirSolicitud(solicitudes[i]);
    }
  }

  async function anadirSolicitud(solicitud) {

    objeto = (await realizarConsulta("apis/busqueda/buscarObjeto.php", {
      idObjeto: solicitud.Objeto_idObjeto
    }))[0];
    grupoObjeto = (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {
      idGrupoObjetos: solicitud.Objeto_GrupoObjetos_idGrupoObjetos
    }))[0];
    usuario = (await realizarConsulta("apis/busqueda/buscarUsuario.php", {
      idUsuario: solicitud.Usuario_idUsuario
    }))[0];
    ubicacion = (await realizarConsulta("apis/busqueda/buscarUbicacion.php", {
      idUbicacion: objeto.Ubicacion_idUbicacion
    }))[0];

    var titulo = [];
    var valores = [];
    var etiqueta = "";

    if (grupoObjeto.tipo != -1) {
      valores.push("Código: " + objeto.codigo);
    }

    if (solicitud.estado == -1) {
      etiqueta = "Préstamo pendiente";
      var botones = {
        "Rechazar solicitud": "eliminarSolicitud(" + solicitud.idGrupoObjetos + ");",
        "Conceder préstamo": "concederPrestamo(" + solicitud.idPrestado + ");"
      }
      valores.push("Fecha estimada de entrega: "+solicitud.fechaEstimadaEntrega);
    } else if (solicitud.estado == 0) {
      etiqueta = "Prestamo activo";
      var botones = {
        "Enviar recordatorio": "enviarRecordatorio(" + solicitud.idPrestado + ");",
        "Finalizar préstamo": "finalizarPrestamo(" + solicitud.idPrestado + ");"
      }
      valores.push("Concedido el: "+solicitud.fechaSalida);
      valores.push("Fecha estimada de entrega: "+solicitud.fechaEstimadaEntrega);
    } else if (solicitud.estado == 1) {
      etiqueta = "Préstamo finalizado";
      var botones = null;
      valores.push("Concedido el: "+solicitud.fechaSalida);
      valores.push("Entregado el: "+solicitud.fechaEntrega);
    } else {
      etiqueta = "Préstamo rechazado";
      var botones = null;
    }



    titulo.push(grupoObjeto.nombre + " con id " + objeto.idObjeto);
    titulo.push("location.hash='objeto-" + objeto.idObjeto + "';")

    $("#concederPrestamo").attr("onclick", "concederPrestamo('" + solicitud.idPrestado + "');");
    $("#eliminarSolicitud").attr("onclick", "eliminarSolicitud('" + solicitud.idGrupoObjetos + "');");

    var imagen = "images/objects/" + grupoObjeto.imagen;

    if (grupoObjeto.marca != "") valores.push("Marca: " + grupoObjeto.marca);
    if (grupoObjeto.modelo != "") valores.push("Modelo: " + grupoObjeto.modelo);
    if (objeto.mejorasEquipo != null) valores.push("Modelo: " + objeto.mejorasEquipo);

    valores.push("Objeto destinado a: " + solicitud.retiradoPor);
    valores.push("Solicitado por: " + usuario.nombre);

    valores.push("Edificio: " + ubicacion.edificio + " | Planta: " + ubicacion.planta + " | Ubicacion: " + ubicacion.ubicacion);


    insertCard($("#variableArea"), "images/objects/" + await grupoObjeto.imagen, titulo, valores, botones, etiqueta, 22);
  }

  cargarSolicitudes();
</script>