<?php

$host = "localhost";
$username = "designosou_av";
$pass = "Mechelen132";
$database ="designosou_citygame";
$table ="tblMannekes";

$mysqli = new mysqli($host, $username, $pass, $database);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
?>