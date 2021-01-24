<?php include "extraWindows/searchBarGroupObjects.php"; ?>
<div id="insideContainer" class="row justify-content-center"></div>
<?php include "extraWindows/modifyGroupObjects.php"; ?>
<script src="http://localhost/UALInventarium/parts/scriptParts/objects1.js"></script>

<script>
  async function actualizarDatos(id) {
    $("#ventanaFlotante").modal("hide");
    await realizarConsulta("apis/modificacion/modificarGrupoDeObjetos.php", {
      idGrupoObjetos: id,
      nombre: $("#nombreGO").val(),
      marca: $("#marcaGO").val(),
      modelo: $("#modeloGO").val()
    });
    await cargarPagina();
  }
  async function eliminarDatos(id) {
    $("#ventanaFlotante").modal("hide");
    await realizarConsulta("apis/eliminacion/eliminarGrupoDeObjetos.php", {
      idGrupoObjetos: id
    });
    await cargarPagina();
  }
</script>