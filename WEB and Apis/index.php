<html>


<a style="font-size:100px">UAL-Inventarium</a><br>

<?php
session_start();
if(isset($_SESSION["email"])&&isset($_SESSION["password"])){

    echo "<a> Email: ".$_SESSION['email']." Contraseña: ".$_SESSION['password']."</a><br>";
    echo "<a href='apis/logout.php'> Cerrar sesión</a><br><br>";

}else{

    echo "<a href='register.php'> Registrarse</a><br><br>";

}

?>




<!--INICIAR SESION-->

<form action="apis/login.php" method="post">
Email: <input type="text" name="email">
Contraseña: <input type="password" name="password">
<input type="hidden" value=0 name="plataforma">
<input type="submit" value="Iniciar sesion">
</form>

<!--BUSCAR USUARIOS-->

<form action="apis/buscarUsuario.php" method="post">
Nombre: <input type="text" name="name">
Email: <input type="text" name="email">
Departamento: <input type="text" name="department">
Rango: <input type="text" name="rank">
<input type="hidden" value=0 name="plataforma">
<input type="submit" value="Buscar usuarios">
</form>

<!--CREAR UBICACION-->

<form action="apis/crearUbicacion.php" method="post">
Ubicación: <input type="text" name="location">
Planta: <input type="text" name="floor">
Edificio: <input type="text" name="building">
<input type="hidden" value=0 name="plataforma">
<input type="submit" value="Crear ubicacion">
</form>

</html>