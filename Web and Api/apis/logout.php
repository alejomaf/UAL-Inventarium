<?php session_start();?>
<script>
setTimeout('redirigir()',1500);
function redirigir(){
    window.location.href="http://localhost:8001/login.php";
}
</script>
<p> Has cerrado la sesión</p>
<?php
include "../connection/connection.php";

$_SESSION["email"]=null;
$_SESSION["password"]=null;
session_destroy();
$conn->close();

//header("Location: ../login.php");
exit();
?>

