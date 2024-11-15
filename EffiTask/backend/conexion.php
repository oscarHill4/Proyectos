<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "trazabilidad";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}
?>