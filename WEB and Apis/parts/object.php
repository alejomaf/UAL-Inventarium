<div><div class="row justify-content-center">
<div style="cursor:pointer;" id="marcoGrupoObjetos" class="col-auto mb-3">
<div class="card" style="width: 36rem;">
<div style="width= 100%; height: 300px;">
  <img id="imagen"  class="card-img-top" src="" alt="Card image cap"></div>
  <div class="card-body">
    <h5 id="nombreGrupoObjeto" class="text-light bg-dark">Card title<</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li id="marca" class="list-group-item">Cras justo odio</li>
    <li id="modelo" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="cantidad" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="cantidadDisponible" class="list-group-item">Vestibulum at eros</li>
  </ul>
  <li id="tipo" class="list-group-item text-secondary">Vestibulum at eros</li>
</div>
</div>
</div>

<!-- ADD TO THE CONTAINTER THE CARDS-->
<div id="copiar" style="display:none">
<div style="cursor:pointer;" id="marco" class="col-auto mb-3" style="width: 18rem;">
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 id="nombreObjeto" class="card-title">Card title</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li id="codigo" class="list-group-item">Cras justo odio</li>
    <li id="ubicacion" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="mejoras" class="list-group-item">Dapibus ac facilisis in</li>
  </ul>
  <div class="card-body">
    <button type="button" class="btn btn-link"  id="modificarObjeto">Modificar</button>
    <button type="button" class="btn btn-link"  id="solicitudObjeto">Solicitud</button>
  </div>
</div>
</div>
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