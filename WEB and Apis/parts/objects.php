<!-- ADD TO THE CONTAINTER THE CARDS-->
<div id="copiar" style="display:none">
<div id="marco" class="mr-2 ml-2 py-3" style="width: 18rem;">
<div class="card border rounded px-3 py-3" style="width: 18rem;background-color:#FDF7FF;"><div style="width= 100%; height: 230px;"> 
  <img id="imagen" class="card-img-top rounded-circle" src="" alt="Card image cap"></div>
  <div class="card-body list-group-item-primary border" style="cursor:pointer;" id="linkGrupoObjeto">
    <h5 style="cursor:pointer;" id="nombreGrupoObjeto" class="card-title text-dark text-center">Card title</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li id="marca" class="list-group-item bg-light">Cras justo odio</li>
    <li id="modelo" class="list-group-item bg-light">Dapibus ac facilisis in</li>
    <li id="cantidad" class="list-group-item bg-light">Dapibus ac facilisis in</li>
    <li id="cantidadDisponible" class="list-group-item bg-light">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    <button type="button" class="btn btn-block btn-primary" id="modificarGrupoDeObjetos" class="card-link">Modificar</button>
  </div>
  <li id="tipo" class="list-group-item list-group-item-primary font-weight-bold text-center">Vestibulum at eros</li>
</div>
</div>
</div></div>

<div id="insideContainer" class="row justify-content-center"></div>
<?php include "extraWindows/modifyGroupObjects.php";?>
<script src="http://localhost/UALInventarium/parts/scriptParts/objects1.js"></script>

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