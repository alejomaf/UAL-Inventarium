<div class="card border rounded mb-3 mx-4 px-3 py-3" style="background-color:#FDF7FF;">

<form id="pasarDatos">

<div id="siEsInventario" class="col-md-12 mb-3">
  <label>Código</label>
  <input type="text" id="codigo" name="codigo" placeholder="Código del inventario" class="form-control">
</div>
<div class="col-md-12 mb-3"> 
  <label>Mejoras en el equipo</label>
  <input type="text" id="mejorasEnElEquipo" name="mejorasEquipo" placeholder="Mejoras en el equipo" class="form-control">
</div>
</form>

<button type="button" id="crearObjeto" onclick="generar()" class="btn btn-block btn-secondary">Crear objeto</button>
<button type="button" id="saltarCreaciones" onclick="saltarCreaciones()" class="btn btn-block btn-secondary">Saltar mejoras y crear objetos restantes</button>

</div>


<script>
if(objetoT==1) {
  $("#siEsInventario").hide();
  $("#codigo").val(-1);
}else{
  $("#saltarCreaciones").hide();
}
</script>