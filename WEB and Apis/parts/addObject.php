<script src="http://localhost/UALInventarium/parts/scriptParts/addObject1.js"></script>

<h2 class="display-4 text-white">+Añadir objeto</h2>
  <p class="lead text-white mb-0">Selecciona el tipo de objeto para añadir, son obligatorios llenar los campos con este símbolo *</p>
<div class="separator"></div>

  
  <div class="media d-flex justify-content-center">
    <button id="objetoInventario" type="button" onclick="seleccionarInventario();" class="btn btn-light mr-5">Inventario</button>
    <button id="objetoFungible" type="button" onclick="seleccionarFungible();" class="btn btn-light mr-5">Fungible</button>
  </div>

  <div class="separator"></div>

  <!--Start of the form section-->
  <form style="display:none" id="formularioCrearObjeto" method="post" enctype="multipart/form-data">


  <input type="hidden" name="cantidad" value=0>
  <input type="hidden" name="cantidadDisponible" value=0>

  <div class="form-row">

  <div id="myBtnGroupObject" class="col-md-4 mb-3">
  <label>Seleccionar el objeto*</label>
  <input id="botonEscritoGroupObject" disabled type="text" placeholder="Objeto" name="nombreAuxiliar" class="form-control" required>
  <input id="botonValorGroupObject" type="hidden" name="nombre" required>
  </div>
  
    <?php include "selectObjectGroup.php";?>

    <div id="postSeleccion" style="display:none" class="form-row">
    <div class="col-md-4 mb-3">
      <label>Imagen del objeto*</label>
      <input type="file" id="fotoDelObjeto" name="fileToUpload" class="form-control-file" required>
    </div>
    
    <!-- Trigger/Open The Modal -->
    <div id="myBtn" class="col-md-4 mb-3">
    <label>Ubicación del objeto*</label>
    <input id="botonEscrito" disabled type="text" placeholder="Ubicación" name="ubicacionAuxiliar" class="form-control" required>
    <input id="botonValor" type="hidden" name="ubicacion" required>
    </div>
    <?php include "selectUbication.php";?>
    <div class="col-md-12 mb-3">
      <label>Marca</label>
      <input type="text" id="marcaDelObjeto" name="marca" placeholder="Marca del objeto" class="form-control">
    </div>
    <div class="col-md-12 mb-3">
      <label>Modelo</label>
      <input type="text" id="modeloDelObjeto" name="modelo" placeholder="Modelo del objeto" class="form-control">
    </div>
    <div class="col-md-12 mb-3">
      <label>Mejoras en el equipo</label>
      <input type="text" id="mejorasEnElEquipo" name="mejorasEnElEquipos" placeholder="Mejoras en el equipo" class="form-control">
    </div>
</div>
</div>
<div class="form-group row col-md-12 mb-3">
  <label>Número de objetos</label>
<div class="col-lg-2">
          <div class="input-group">
      <span class="input-group-btn">
          <button type="button" class="quantity-left-minus btn btn-danger btn-number"  onclick="borrarColumna();" data-type="minus" data-field="">
          - 
          <span class="glyphicon glyphicon-minus"></span>
          </button>
      </span>
      <input type="text" id="quantity" name="quantity" class="form-control input-number" value="1" min="1" max="50">
      <span class="input-group-btn">
          <button type="button" class="quantity-right-plus btn btn-success btn-number" onclick="anadirColumna();" data-type="plus" data-field="">
          +    
          <span class="glyphicon glyphicon-plus"></span>
          </button>
      </span>
  </div>
</div>
</div>
<div class="form-row">
<div type="hidden" id="codigoDelInventario" class="col-md-12 mb-3">

</div>

<div class="media d-flex justify-content-center">
<button class="btn btn-primary" type="submit">Añadir objeto</button>
</div>

</form>
<!--End of the form section-->

<script src="http://localhost/UALInventarium/parts/scriptParts/addObject2.js"></script>