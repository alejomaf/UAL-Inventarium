<div class="card border rounded mb-3 mx-4 px-3 py-3" style="background-color:#FDF7FF; width:22rem">
<form id="pasarDatos">  
<div style="width: 20rem;">
<img class="card-img-top" src="images/essentials/uploadImage.png" alt="Card image cap"></div>
  <div class="card-body">
    <div class="form-group">
    <div class="alert alert-warning">
        <a>Debes subir una imagen del objeto obligatoriamente</a>.
      </div>
      <label class="font-weight-bold">Imagen del objeto*</label>
      <input type="file" id="fotoDelObjeto" name="fileToUpload" onclick="$('#buttoncrearGrupoDeObjetosModal').prop('disabled',false);" class="form-control-file" required>
    </div>
    <div class="form-group">
      <label class="font-weight-bold">Marca</label>
      <input type="text" id="marcaDelObjeto" name="marca" placeholder="Marca del objeto" class="form-control">
    </div>
    <div class="form-group">
      <label class="font-weight-bold">Modelo</label>
      <input type="text" id="modeloDelObjeto" name="modelo" placeholder="Modelo del objeto" class="form-control">
    </div>
  </div>
  <div class="align-content-center" id="botonCrearModal">
  </div>
</form>
</div>

<script>
  //if ($('#fotoDelObjeto').val() == '') return;
  generarModal($("#mainAddObject"), "crearGrupoDeObjetosModal", "Crear objeto", "Recuerda que si creas un kit luego haz de añadirle su respectivo contenido", "Cancelar creación", ["Crear","cogerImagen();quitarModal($('#crearGrupoDeObjetosModal'));"], $("#botonCrearModal"), "Crear grupo de objetos");
  $("#buttoncrearGrupoDeObjetosModal").prop("disabled",true);
</script>
    