<div id="insideGOContainer" class="row justify-content-center">

</div>

<div class="container-fluid mt-4"><div id="insideContainer" class="row"></div></div>
<?php include "extraWindows/modifyObject.php";?>
<?php include "extraWindows/objectRequirement.php";?>
</div>
<script src="http://localhost/UALInventarium/parts/scriptParts/object1.js"></script>

<script>

async function actualizarDatos(id){
  $("#ventanaFlotante").modal("hide");
  await realizarConsulta("apis/modificacion/modificarGrupoDeObjetos.php", {idGrupoObjetos: id, nombre:$("#nombreGO").val(), marca:$("#marcaGO").val(), modelo:$("#modeloGO").val()});
  await cargarPagina();
}
async function eliminarDatos(id){
  $("#ventanaFlotante").modal("hide");
  await realizarConsulta("apis/eliminacion/eliminarGrupoDeObjetos.php", {idGrupoObjetos: id});
  await cargarPagina();
}

</script>