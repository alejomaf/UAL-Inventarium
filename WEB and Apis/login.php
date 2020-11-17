<form id="iniciarSesion" action="apis/login.php" method="post">
<h1>Iniciar sesión</h1>
        <div class="form-group">
            <label>Correo electrónico</label>
            <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" class="form-control" required>
        </div>
        <div class="form-group">
            <label>Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" class="form-control"required >
        </div>
        <input type="hidden" id="plataforma" name="plataforma" value=0 class="form-control">
        <div class="form-group">
            <input type="checkbox" class="form-check-input" id="mantenerSesion">
            <label class="form-check-label" for="exampleCheck1">Mantener sesión iniciada</label>
        </div>

        <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
    <br>
    <button type="btn" onclick="cambiarObjeto('register.php');" id="registrarse" class="btn btn-secondary btn-block">Registrase</button>
  </form>