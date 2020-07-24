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
<input type="submit" value="Crear ubicacion">
</form>

<!--CREAR GRUPO DE OBJETOS-->

<form action="apis/crearGrupoDeObjetos.php" method="post">
Cantidad: <input type="text" name="cantidad">
Nombre: <input type="text" name="nombre">
Imagen: <input type="text" name="imagen">
Marca: <input type="text" name="marca">
Modelo: <input type="text" name="modelo">
Cantidad disponible: <input type="text" name="cantidadDisponible">
<input type="submit" value="Crear grupo de objetos">
</form>

<!--CREAR OBJETO-->

<form action="apis/crearObjeto.php" method="post">
Mejoras del equipo: <input type="text" name="mejorasEquipo">
Código: <input type="text" name="codigo">
Grupo objetos:  <select name="grupoObjetos">
<?php
include "connection/connection.php";
$sql = "SELECT * FROM grupoobjetos;";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<option value=".$row["idGrupoObjetos"].">".$row["nombre"]."</option>";
    }
}
?>
</select>
Ubicacion: <select name="ubicacion">
<?php
$sql = "SELECT * FROM ubicacion;";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<option value=".$row["idUbicacion"].">".$row["ubicacion"]."-".$row["planta"]."-".$row["edificio"]."</option>";
    }
}
?>
</select>
<input type="submit" value="Crear objeto">
</form>

<!--CREAR CONFIGURACION-->

<form action="apis/crearConfiguracion.php" method="post">
IP: <input type="text" name="ip">
MAC: <input type="text" name="mac">
Boca: <input type="text" name="boca">
Armario: <input type="text" name="armario">
Usuario: <input type="text" name="usuario">
Contrasena: <input type="text" name="contrasena">
Objeto:  <select name="objeto">
<?php
$sql = "SELECT * FROM objeto;";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row["GrupoObjetos_idGrupoObjetos"].";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {$nombreObjeto=$row2["nombre"];}}

        echo "<option value=".$row["idObjeto"].">".$nombreObjeto."-".$row["idObjeto"]."</option>";
    }
}
?>
</select>
<input type="submit" value="Crear configuración">
</form>

<!--CREAR PRÉSTAMO-->

<form action="apis/crearPrestamo.php" method="post">
Retirado por: <input type="text" name="retiradoPor">
Fecha estimada de entrega: <input type="date" name="fechaEstimadaEntrega">
Prestado por:  <select name="usuario">
<?php
$sql = "SELECT * FROM usuario;";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<option value=".$row["idUsuario"].">".$row["nombre"]."</option>";
    }
}
?>
</select>
Objeto:  <select name="objeto">
<?php
$sql = "SELECT * FROM objeto;";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row["GrupoObjetos_idGrupoObjetos"].";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {$nombreObjeto=$row2["nombre"];}}

        echo "<option value=".$row["idObjeto"].">".$nombreObjeto."-".$row["idObjeto"]."</option>";
    }
}
?>
</select>
<input type="submit" value="Crear préstamo">
</form>


</html>