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

<!--
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
|||||||||||||||||||||||||||||||||||||||||||Búsqueda de valores||||||||||||||||||||||||||||||||||||||||
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
-->

<!--BUSCAR USUARIOS-->

<form action="apis/buscarUsuario.php" method="post">
Nombre: <input type="text" name="name">
Email: <input type="text" name="email">
Departamento: <input type="text" name="department">
Rango: <input type="text" name="rank">
<input type="hidden" value=0 name="plataforma">
<input type="submit" value="Buscar usuarios">
</form>

<!--
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
|||||||||||||||||||||||||||||||||||||||||||Creación de valores||||||||||||||||||||||||||||||||||||||||
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
-->

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

<!--
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
||||||||||||||||||||||||||||||||||||||||Eliminación de valores||||||||||||||||||||||||||||||||||||||||
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
-->

<!--ELIMINAR USUARIO-->

<form action="apis/eliminacion/eliminarUsuario.php" method="post">
Usuario:  <select name="idUsuario">
<?php
$sql = "SELECT * FROM usuario;";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        echo "<option value=".$row["idUsuario"].">".$row["nombre"]."-".$row["correoElectronico"]."</option>";
    }
}
?>
</select>
<input type="submit" value="Eliminar usuario">
</form>

<!--ELIMINAR UBICACION-->

<form action="apis/eliminacion/eliminarUbicacion.php" method="post">
Ubicación:  <select name="idUbicacion">
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
<input type="submit" value="Eliminar ubicación">
</form>

<!--ELIMINAR PRESTAMO-->

<form action="apis/eliminacion/eliminarPrestamo.php" method="post">
Préstamo:  <select name="idPrestamo">
<?php
$sql = "SELECT * FROM prestado;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row["Objeto_GrupoObjetos_idGrupoObjetos"].";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {$nombreObjeto=$row2["nombre"];}}

        $sql3 = "SELECT * FROM usuario WHERE idUsuario=".$row["Usuario_idUsuario"].";";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0) {
        while($row3 = $result3->fetch_assoc()) {$nombreUsuario=$row3["nombre"]."-".$row3["correoElectronico"];}}


        echo "<option value=".$row["idPrestado"].">".$nombreObjeto." ha sido prestada por ".$nombreUsuario." a ".$row["retiradoPor"]."</option>";
    }
}
?>
</select>
<input type="submit" value="Eliminar préstamo">
</form>

<!--ELIMINAR CONFIGURACIÓN-->

<form action="apis/eliminacion/eliminarConfiguracion.php" method="post">
Configuracion:  <select name="idConfiguracion">
<?php
$sql = "SELECT * FROM configuracion;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM objeto WHERE idObjeto=".$row["Objeto_idObjeto"].";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {

                $sql3 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row2["GrupoObjetos_idGrupoObjetos"].";";
                $result3 = $conn->query($sql3);
                if ($result3->num_rows > 0) {
                while($row3 = $result3->fetch_assoc()) {$nombreObjeto=$row3["nombre"];}}
            }
        }
        echo "<option value=".$row["idConfiguracion"].">".$nombreObjeto."-".$row["ip"]."-".$row["mac"]."</option>";
    }
}
?>
</select>
<input type="submit" value="Eliminar configuración">
</form>

<!--ELIMINAR OBJETO-->

<form action="apis/eliminacion/eliminarObjeto.php" method="post">
Objeto:  <select name="idObjeto">
<?php
$sql = "SELECT * FROM objeto;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql3 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row["GrupoObjetos_idGrupoObjetos"].";";
                $result3 = $conn->query($sql3);
                if ($result3->num_rows > 0) {
                while($row3 = $result3->fetch_assoc()) {$nombreObjeto=$row3["nombre"];}}

        if($row["codigo"]==-1) $codigo=""; else $codigo=" - ".$row["codigo"];
        echo "<option value=".$row["idObjeto"].">".$nombreObjeto.$codigo."</option>";
    }
}
?>
</select>
<input type="submit" value="Eliminar objeto">
</form>

<!--ELIMINAR GRUPO DE OBJETOS-->

<form action="apis/eliminacion/eliminarGrupoDeObjetos.php" method="post">
Grupo de objetos:  <select name="idGrupoObjetos">
<?php
$sql = "SELECT * FROM grupoobjetos;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql3 = "SELECT * FROM objeto WHERE GrupoObjetos_idGrupoObjetos=".$row["idGrupoObjetos"].";";
                $result3 = $conn->query($sql3);
                $numObjetos=$result3->num_rows; 

        echo "<option value=".$row["idGrupoObjetos"].">".$row["nombre"]." - ".$numObjetos."</option>";
    }
}
?>
</select>
<input type="submit" value="Eliminar grupo de objetos">
</form>

<!--
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
|||||||||||||||||||||||||||||||||||||||Modificación de valores||||||||||||||||||||||||||||||||||||||||
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
-->


<!--MODIFICAR UBICACION-->

<form action="apis/modificacion/modificarUbicacion.php" method="post">
Ubicación:  <select name="idUbicacion">
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
Ubicación: <input type="text" name="location">
Planta: <input type="text" name="floor">
Edificio: <input type="text" name="building">
<input type="submit" value="Modificar ubicacion">
</form>

<!--MODIFICAR USUARIO-->

<form action="apis/modificacion/modificarUsuario.php" method="post">
Usuario:  <select name="idUsuario">
<?php
$sql = "SELECT * FROM usuario;";
$result = $conn->query($sql);
echo $conn->error;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        echo "<option value=".$row["idUsuario"].">".$row["nombre"]."-".$row["correoElectronico"]."-".$row["contrasena"]."-(".$row["rango"].")-".$row["departamento"]."-".$row["telefono"]."</option>";
    }
}
?>
</select>
Name: <input type="text" name="name">
Contraseña: <input type="password" name="password">
Email: <input type="email" name="email">
Rango: <input type="text" name="rank">
Departamento: <input type="text" name="department">
Telefono: <input type="text" name="phone">
<input type="submit" value="Modificar usuario">
</form>

<!--MODIFICAR GRUPO DE OBJETOS-->

<form action="apis/modificacion/modificarGrupoDeObjetos.php" method="post">
Grupo de objetos:  <select name="idGrupoObjetos">
<?php
$sql = "SELECT * FROM grupoobjetos;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql3 = "SELECT * FROM objeto WHERE GrupoObjetos_idGrupoObjetos=".$row["idGrupoObjetos"].";";
                $result3 = $conn->query($sql3);
                $numObjetos=$result3->num_rows; 

        echo "<option value=".$row["idGrupoObjetos"].">".$row["nombre"]." - ".$numObjetos."</option>";
    }
}
?>
</select>
Cantidad: <input type="text" name="cantidad">
Nombre: <input type="text" name="nombre">
Imagen: <input type="text" name="imagen">
Marca: <input type="text" name="marca">
Modelo: <input type="text" name="modelo">
Cantidad disponible: <input type="text" name="cantidadDisponible">
<input type="submit" value="Modificar grupo de objetos">
</form>

<!--MODIFICAR OBJETO-->

<form action="apis/modificacion/modificarObjeto.php" method="post">
Objeto:  <select name="idObjeto">
<?php
$sql = "SELECT * FROM objeto;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql3 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row["GrupoObjetos_idGrupoObjetos"].";";
                $result3 = $conn->query($sql3);
                if ($result3->num_rows > 0) {
                while($row3 = $result3->fetch_assoc()) {$nombreObjeto=$row3["nombre"];}}

        if($row["codigo"]==-1) $codigo=""; else $codigo=" - ".$row["codigo"];
        echo "<option value=".$row["idObjeto"].">".$nombreObjeto.$codigo."</option>";
    }
}
?>
</select>
Mejoras del equipo: <input type="text" name="mejorasEquipo">
Código: <input type="text" name="codigo">
Grupo objetos:  <select name="idGrupoObjetos">
<option value="">No modificar</option>
<?php
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
<option value="">No modificar</option>
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
<input type="submit" value="Modificar objeto">
</form>

<!--MODIFICAR CONFIGURACION-->

<form action="apis/modificacion/modificarConfiguracion.php" method="post">
Configuracion:  <select name="idConfiguracion">
<?php
$sql = "SELECT * FROM configuracion;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM objeto WHERE idObjeto=".$row["Objeto_idObjeto"].";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {

                $sql3 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row2["GrupoObjetos_idGrupoObjetos"].";";
                $result3 = $conn->query($sql3);
                if ($result3->num_rows > 0) {
                while($row3 = $result3->fetch_assoc()) {$nombreObjeto=$row3["nombre"];}}
            }
        }
        echo "<option value=".$row["idConfiguracion"].">".$nombreObjeto."-".$row["ip"]."-".$row["mac"]."</option>";
    }
}
?>
</select>
IP: <input type="text" name="ip">
MAC: <input type="text" name="mac">
Boca: <input type="text" name="boca">
Armario: <input type="text" name="armario">
Usuario: <input type="text" name="usuario">
Contrasena: <input type="text" name="contrasena">
Objeto:  <select name="idObjeto">
<option value="">No modificar</option>
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
<input type="submit" value="Modificar configuración">
</form>

<!--MODIFICAR PRÉSTAMO-->
<form action="apis/modificacion/modificarPrestamo.php" method="post">
Préstamo:  <select name="idPrestado">
<?php
$sql = "SELECT * FROM prestado;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM grupoobjetos WHERE idGrupoObjetos=".$row["Objeto_GrupoObjetos_idGrupoObjetos"].";";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {$nombreObjeto=$row2["nombre"];}}

        $sql3 = "SELECT * FROM usuario WHERE idUsuario=".$row["Usuario_idUsuario"].";";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0) {
        while($row3 = $result3->fetch_assoc()) {$nombreUsuario=$row3["nombre"]."-".$row3["correoElectronico"];}}


        echo "<option value=".$row["idPrestado"].">".$nombreObjeto." ha sido prestada por ".$nombreUsuario." a ".$row["retiradoPor"]."</option>";
    }
}
?>
</select>
Retirado por: <input type="text" name="retiradoPor">
Fecha de salida: <input type="date" name="fechaSalida">
Fecha de entrega: <input type="date" name="fechaEntrega">
Fecha estimada de entrega: <input type="date" name="fechaEstimadaEntrega">
Prestado por:  <select name="idUsuario">
<option value="">No modificar</option>
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
Objeto:  <select name="idObjeto">
<option value="">No modificar</option>
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
<input type="submit" value="Modificar préstamo">
</form>

</html>