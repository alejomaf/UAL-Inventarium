<?php include "connection/connection.php";
if (isset($_POST["email"])) {
    $sql = "SELECT * FROM usuario WHERE correoElectronico='" . $_POST["email"] . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $email = $row["correoElectronico"];
            $idVerificacion = $row["contrasena"];
            include "apis/mail/sendEmailRecoverPassword.php";
            header("Location: registration/registerRecover.php");
            return;
        }
    }
}

?>

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
                <br>
                <form id="iniciarSesion" action="recoverPassword.php" method="post">
                    <h1 class="text-center font-weight-bold">Recuperar contraseña</h1><br>
                    <div class="form-group">
                        <label class="font-italic">Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña</label>
                        <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" class="form-control" required>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary btn-block">Recuperar contraseña</button>
                    <br>
                </form>
                <a type="btn" href="http://localhost/UALInventarium/login.php" id="registrarse" class="btn btn-secondary btn-block">Volver</a>
            </div>
        </div>
    </div>

</body>

</html>