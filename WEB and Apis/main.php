<!DOCTYPE html>
<?php include "scripts/head.html";?>

<body>
<div class="container">
  <h1>Iniciar sesión</h1>
  <div class="row align-items-center">
      <div class="col align-self-center">
  <form action="apis/login.php" method="post">

        <div class="form-group">
            <label>Correo electrónico</label>
            <input type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
            <label>Contraseña</label>
            <input type="password" id="password" class="form-control">
        </div>
        <div class="form-group">
            <input type="checkbox" class="form-check-input" id="mantenerSesion">
            <label class="form-check-label" for="exampleCheck1">Mantener sesión iniciada</label>
        </div>

        <button type="submit" class="btn btn-primary">Iniciar sesión</button>

  </form>
</div>
</div>
</div>

</body>
</html>