<?php include "../unitPartsViews/userUnitView/modifyUser.php"?>
<div class="card" style="width: 22rem;">
  <div class="card-body">
    <h5 class="card-title text-center">
    <?php echo $_SESSION["nombre"];?>
    </h5>
    <p class="card-text"><b>Correo electrónico: </b><?php echo $_SESSION["email"];?></p>
    <p class="card-text"><b>Rango: </b><?php if ($_SESSION["rango"]==0) echo "Técnico";else echo "Profesor";?></p>
    <p class="card-text"><b>Teléfono: </b><?php echo $_SESSION["telefono"];?></p>
    <p class="card-text">
    <?php
    $valorDepartamento = $_SESSION["departamento"];
    $departamento = "";
    switch($valorDepartamento){
      case 0: $departamento="Departamento de informática"; break;
      case 1: $departamento="Departamento: Ingeniería de sistemas y automática"; break;
      case 2: $departamento="Departamento: Lenguaje y sistemas informáticos"; break;
      case 3: $departamento="Departamento: Ciencias de la computación e inteligencia artificial"; break; 
      case 4: $departamento="Departamento: Arquitectura y tecnología de computadores"; break;
    }
    echo $departamento;
    ?>
    </p>

    <button class="btn btn-block btn-primary" onclick="showModalModificarUsuario();">Modificar datos</button>
  </div>
</div>

  