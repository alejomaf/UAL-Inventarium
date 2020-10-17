<div class="card rounded" style="width: 25rem;">
<form id="pasarDatos">  
<img class="card-img-top" src="images/essentials/uploadImage.png" alt="Card image cap">
  <div class="card-body">
    <div class="col-md-12 mb-3">
    <div class="alert alert-warning">
        <a>Debes subir una imagen del objeto obligatoriamente</a>.
      </div>
      <label>Imagen del objeto*</label>
      <input type="file" id="fotoDelObjeto" name="fileToUpload" class="form-control-file" required>
    </div>
    <div class="col-md-12 mb-3">
      <label>Marca</label>
      <input type="text" id="marcaDelObjeto" name="marca" placeholder="Marca del objeto" class="form-control">
    </div>
    <div class="col-md-12 mb-3">
      <label>Modelo</label>
      <input type="text" id="modeloDelObjeto" name="modelo" placeholder="Modelo del objeto" class="form-control">
    </div>
  </div>
  <div class="align-content-center">
  <button id="Crear grupo de objetos" type="button" onclick="cogerImagen();"class="btn btn-primary">Crear grupo de objetos</button>
  </div>
</form>
</div>
    