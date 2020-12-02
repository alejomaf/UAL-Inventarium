<div style="width: 100%">
<button id="mostrarOpciones" class="btn btn-dark btn-block">Buscar grupo de objetos y objetos</button>
<div id="opciones" class="card bg-light" style="width: 100%; display:none">
<form>
<br>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Nombre</b></label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="nombre" placeholder="Nombre">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Marca</b></label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="marca" placeholder="Marca">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Modelo</b></label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="modelo" placeholder="Modelo">
        </div>
    </div>
</form>

<button type="button" id="mostrarOpcionesAvanzadas" class="btn btn-info btn-block">Opciones avanzadas</button>
<button id="botonEscrito" type="button" class="btn btn-block btn-secondary" onclick="cargarEdificios(); $('#myModal').modal('show');" placeholder="Ubicación"required>Seleccionar ubicación</button>
<input id="botonValor" type="hidden" name="ubicacion" required>
<?php include "extraWindows/selectUbication.php";?>
</div>

<div id="opcionesAvanzadas" class="card bg-light" style="width: 100%; display:none">
<form>
<br>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Código</b></label>
        <div class="col-sm-9">
        <input type="text" class="form-control" id="codigo" placeholder="Código">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Mejoras del equipo</b></label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="mejorasDelEquipo" placeholder="Mejoras del equipo">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Etiqueta</b></label>
        <div class="col-sm-9">
            <input type="text" id="etiqueta" name="etiqueta" placeholder="Etiqueta del equipo" class="form-control">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Organizativa</b></label>
        <div class="col-sm-9">
        <select class="form-control" id="organizativa">
            <option value=0>Departamento de informática</option>
            <option value=1>Ingeniería de sistemas y automática</option>
            <option value=2>Lenguaje y sistemas informáticos</option>
            <option value=3>Ciencias de la computación e inteligencia artificial</option>
            <option value=4>Arquitectura y tecnología de computadores</option>
        </select>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"><b>Observaciones</b></label>
        <div class="col-sm-9">
        <input type="text" id="observaciones" name="observaciones" placeholder="Observaciones del equipo" class="form-control">
        </div>
    </div>
</form>
</div>
</div>

<script>

$("#mostrarOpciones").click(function(){
    $("#opcionesAvanzadas").fadeOut(400);
    $("#opciones").fadeToggle(400);
});
$("#mostrarOpcionesAvanzadas").click(function(){
    $("#opcionesAvanzadas").fadeToggle(400);
});
</script>