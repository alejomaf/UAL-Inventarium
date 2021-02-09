<!DOCTYPE html>

<head>
    <title>UAL-Inventarium</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="styles/main.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>

<body>
    <div class="container">
        <div class="row align-items-center">
            <div id="variableArea" class="col align-self-center">

                <form id="iniciarSesion" action="apis/login.php" method="post">
                    <h1>Iniciar sesión</h1>
                    <div class="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" class="form-control" required>
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
            </div>
        </div>
    </div>

</body>

</html>

<script>
    $("#iniciarSesion").attr("action", "apis/login.php" + location.hash);
    function onSubmit(token) {
     document.getElementById("demo-form").submit();
   }
    function cambiarObjeto(objeto) {
        $("#variableArea").empty().hide().fadeIn('50');
        $("#variableArea").hide().load(objeto).fadeIn('300');
    }
</script>