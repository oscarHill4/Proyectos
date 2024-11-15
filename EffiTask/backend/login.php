<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$correo = $data['correo'];
$contraseña = $data['contraseña'];

$sql = "SELECT * FROM login WHERE correo = '$correo'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($contraseña === $user['contraseña']) {
        echo json_encode(["mensaje" => "Inicio de sesión exitoso", "redirect" => "http://localhost/EffiTask/frontend/public/html/initial_section.html"]);
    } else {
        echo json_encode(["error" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["error" => "No se encontró el usuario"]);
}


$conn->close();
?>