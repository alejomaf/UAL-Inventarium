<?php

include "../../connection/connection.php";

//Verifica la dirección de correo electrónico de un usuario
if(isset($_POST["oldPassword"])&&isset($_POST["password"])){
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $sql3 = "SELECT * FROM usuario WHERE contrasena='{$_POST["oldPassword"]}'";

    $result = $conn->query($sql3);
    echo $conn->error;

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if($_POST["oldPassword"]==$row["contrasena"]){
                $sql2 = "UPDATE usuario SET contrasena = '{$password}' WHERE contrasena = '{$row["contrasena"]}'";
                $result = $conn->query($sql2);
                header("Location: ../../registration/registerRecoverFinish.php");
                return;
            }
        }
    }
    header("Location: ../../login.php");
}
if (isset($_GET["verify"])) {
    $sql3 = "SELECT * FROM usuario WHERE contrasena='{$_GET["verify"]}'";

    $result = $conn->query($sql3);
    echo $conn->error;

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            //return;
        }
    }else{
    header("Location: ../../login.php");}
}else{
    header("Location: ../../login.php");
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
    <link rel="stylesheet" href="../../styles/main.css">
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
                        <label>Contraseña</label>
                        <input type="password" name="password" class="form-control" placeholder="Ingrese su contraseña" required>
                    </div>
                    <div class="form-group">
                        <label>Repita la contraseña</label>
                        <input type="password" name="password1" class="form-control" placeholder="Repita su contraseña" required>
                    </div>
                    <input hidden value="<?php echo $_GET["verify"]?>" name="oldPassword">
                    <br>
                    <button type="submit" class="btn btn-primary btn-block">Recuperar contraseña</button>
                    <br>
                </form>
            </div>
        </div>
    </div>

</body>

</html>