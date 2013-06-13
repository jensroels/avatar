<?php
include_once "config.php"; 

$id = $_POST['id'];

$query = "SELECT * FROM ".$table." where id =".$id;

$result = $mysqli->query($query);

  while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
        }
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
echo json_encode($myArray);
$result->close();
$mysqli->close();
?>