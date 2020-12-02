<div class="card" style="width: 22rem;">
  <div class="card-body">
    <h5 class="card-title">
    <?php session_start(); echo $_SESSION["nombre"];?>
    </h5>
    <p class="card-text"><b>Correo electrónico: </b><?php echo $_SESSION["email"];?></p>
    <p class="card-text"><b>Rango: </b><?php if ($_SESSION["rango"]==0) echo "Técnico";else echo "Profesor";?></p>
    <p class="card-text"><b>Teléfono: </b><?php echo $_SESSION["telefono"];?></p>
    <button class="btn btn-block btn-primary">Modificar datos</button>
  </div>
</div>


<script>

function cargarPerfil(){

}

</script>


