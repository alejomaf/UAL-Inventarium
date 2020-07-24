<?php 

include 'connection/connection.php';

function checkConexion($key){
    
    $sql = "SELECT * FROM mydb.keys WHERE key='".$key."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
            echo "<a>".$row["key"]."</a>";
        }
    }else{
        closeConnection();
        header("Location: ../index.php");
    }

}

?>