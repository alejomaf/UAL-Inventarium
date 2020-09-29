<?php
session_start();
if($_SESSION['rango']==0) include "parts/verticalNavBarTechnician.php";
else include "parts/verticalNavBarTeacher.php";
?>