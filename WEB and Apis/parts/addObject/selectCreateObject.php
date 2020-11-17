<div class="card border rounded mb-3 mx-4  px-3 py-3" style="width: 18rem;background-color:#FDF7FF;">
        <img class="card-img-top" src="images/essentials/busquedaGrupoObjetos.png" alt="Card image cap">
        <div class="card-body">
        <div id="myBtnGroupObject" class="col-md-12 mb-3">
        <label class="font-weight-bold">Seleccionar el objeto*</label>
        <div onclick="$('#myModalGroupObject').modal('show');">
        <input id="botonEscritoGroupObject" disabled type="text" placeholder="Objeto" name="nombreAuxiliar" class="form-control" required>
        </div>
        <input id="botonValorGroupObject" type="hidden" name="nombre" required>
        </div>
        <?php include "../selectObjectGroup.php";?>
        </div>
    </div>
