<div id="contenedorPrestamosFinalizados" class="card mb-3" style="width: 100%;background-color: rgba(255, 255, 0, 0.4);">
  <div class="card-body">
    <h4 class="card-title">Finalizado plazo estimado de fecha de entrega</h4>
    <div class="container-fluid mt-4">
      <div id="insideContainerFP" class="row"></div>
    </div>
  </div>
</div>
<div id="contenedorPrestamosActivos" class="card mb-3" style="width: 100%;background-color: rgba(245, 245, 245, 0.4);">
  <div class="card-body">
    <h4 class="card-title">Préstamos activos</h4>
    <div class="container-fluid mt-4">
      <div id="insideContainerPA" class="row"></div>
    </div>
  </div>
</div>
<script>
  var solicitudes = [];

  async function enviarRecordatorio(id) {}

  async function cargarSolicitudes() {
    solicitudes = await realizarConsulta("apis/busqueda/buscarPrestamo.php", {
      estado: 0
    });
    if (solicitudes == null) {
      aquiNoHayNada($("#insideContainerPA"));
      return;
    }
    for (k = 0; k < solicitudes.length; k++) {
      await anadirSolicitud(solicitudes[k]);
    }

    if ($("#insideContainerPA").children().length == 0 && $("#insideContainerFP").children().length == 0) {

      $("#contenedorPrestamosActivos").remove();
      $("#contenedorPrestamosFinalizados").remove();
      aquiNoHayNada($("#variableArea"));

    } else if ($("#insideContainerPA").children().length == 0) {
      $("#contenedorPrestamosActivos").remove();
    } else if ($("#insideContainerFP").children().length == 0) {
      $("#contenedorPrestamosFinalizados").remove();
    }

  }

  async function anadirSolicitud(solicitud) {
    var botones = {
      "Enviar recordatorio": "enviarRecordatorio('" + solicitud.idGrupoObjetos + "');"
    };
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

    if (grupoObjeto.marca != "") filas.push("Marca: " + grupoObjeto.marca);
    if (grupoObjeto.modelo != "") filas.push("Modelo: " + grupoObjeto.modelo);
    //if (objeto.mejorasEquipo != "") filas.push("Mejoras del equipo: " + objeto.mejorasEquipo);

    var fechaActual = new Date("<?php echo date("Y-m-d"); ?>");
    var fechaEstimadaEntrega = new Date(solicitud.fechaEstimadaEntrega);

    if (fechaEstimadaEntrega <= fechaActual) {
      var localizacion = $("#insideContainerFP");
    } else {
      var localizacion = $("#insideContainerPA");
      botones = null;
    }

    insertCard(localizacion, "images/objects/" + grupoObjeto.imagen, [grupoObjeto.nombre, "location.hash='#solicitud-" + solicitud.idPrestado + "';"], filas, botones, tipoObjeto, 20);
  }

  cargarSolicitudes();
</script>