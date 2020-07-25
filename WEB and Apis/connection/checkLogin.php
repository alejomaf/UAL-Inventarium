<?php

include "connection.php";


if(isset($_SESSION['email']) && $_SESSION['email'] != ''&&isset($_SESSION['password']) && $_SESSION['password'] != '') {

    $email=$_SESSION['email'];
    $password=$_SESSION['password'];
}else if(isset($GLOBALS["emailU"]) && $GLOBALS["emailU"] != ''&&isset($GLOBALS["passwordU"]) && $GLOBALS["passwordU"] != ''){
    $email=$GLOBALS["emailU"];
    $password=$GLOBALS["passwordU"];
}

if(isset($email)&&isset($password)){
$sql = "SELECT * FROM usuario WHERE correoElectronico='".$email."'AND contrasena='".$password."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

}else{
    exec("php ../apis/logout.php");
    exit();
}


}else{
    exec("php ../apis/logout.php");
    exit();
}
?>