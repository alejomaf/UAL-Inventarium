<!DOCTYPE html>

<head>
    <title>UAL-Inventarium</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../styles/main.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>

<body>
    <div class="container">
        <div class="row align-items-center">
            <div id="variableArea" class="col align-self-center bg-white">
                <h2>Muchas gracias por haberse registrado</h2>
                <p>Si no se había registrado con anterioridad le hemos enviado un correo electrónico para que confirme sus datos. No olvide que después de confirmarlo tiene que ser <b>dado de alta por un técnico</b>.</p>
            </div>
        </div>
    </div>

</body>

</html>

<script>
setTimeout('redirigir()',10000);

function redirigir(){
    window.location.href="http://localhost/UALInventarium/login.php";
}
</script>