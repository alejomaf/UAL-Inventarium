<?php

include "../connection/connection.php";

$_SESSION["email"]=null;
$_SESSION["password"]=null;
session_destroy();
$conn->close();

header("Location: ../main.php");
?>