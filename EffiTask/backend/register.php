<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$usuario = $data['usuario']; 
$correo = $data['correo']; 
$contraseña = $data['contraseña'];

$sql = "SELECT * FROM login WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["error" => "El correo ya está registrado"]);
    exit;
}

$sql = "INSERT INTO login (usuario, correo, contraseña) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $usuario, $correo, $contraseña);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Registro exitoso"]);
} else {
    echo json_encode(["error" => "Error al registrar el usuario"]);
}

$stmt->close();
$conn->close();
?>