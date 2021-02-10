<form id="formularioRegistroUsuario" action="apis/creacion/registration.php" method="post" oninput='up2.setCustomValidity(password.value != password1.value ? "Las contraseñas no coinciden." : "")'>
    <h1>Registrarse</h1>
    <div class="form-group">
        <label>Nombre completo</label>
        <input type="text" name="name" class="form-control" aria-describedby="nameHelp" placeholder="Ingrese su nombre completo" required>
        <small id="nameHelp" class="form-text text-muted">No compartiremos sus datos con nadie</small>
    </div>
    <div class="form-group">
        <label>Contraseña</label>
        <input type="password" name="password" class="form-control" placeholder="Ingrese su contraseña" required>
    </div>
    <div class="form-group">
        <label>Repita la contraseña</label>
        <input type="password" name="password1" class="form-control" placeholder="Repita su contraseña" required>
    </div>
    <div class="form-group">
        <label>Correo electrónico</label>
        <input type="email" id="emailUser" name="email" class="form-control" placeholder="Ingrese su correo electrónico" required>
    </div>
    <div class="form-group">
        <label>Departamento</label>
        <select class="form-control" name="departamento" id="departamento">
            <option value=0>Departamento de informática</option>
            <option value=1>Ingeniería de sistemas y automática</option>
            <option value=2>Lenguaje y sistemas informáticos</option>
            <option value=3>Ciencias de la computación e inteligencia artificial</option>
            <option value=4>Arquitectura y tecnología de computadores</option>
        </select>
    </div>
    <div class="form-group">
        <label>Número de teléfono</label>
        <input type="number" name="phone" class="form-control" placeholder="Ingrese su número de teléfono" required>
    </div>
    <div class="form-group">
        <div class="g-recaptcha" data-sitekey="your_site_key"></div>
    </div>
    <br><br>
    <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
    <br>
    <button type="btn" onclick="cambiarObjeto('login.php');" class="btn btn-secondary btn-block">Volver</button>
</form>