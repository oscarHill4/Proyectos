<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$cedula = $data['cedula']; 
$nombre_empleado = $data['nombre_empleado'];
$zona = $data['zona']; 
$cargo = $data['cargo']; 
$telefono_empleado = $data['telefono_empleado'];

$sql = "INSERT INTO empleados (cedula, nombre_empleado, zona, cargo, telefono_empleado) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $cedula, $nombre_empleado, $zona, $cargo, $telefono_empleado);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Empleado registrado exitosamente"]);
} else {
    echo json_encode(["error" => "Error al registrar el empleado"]);
}

$stmt->close();
$conn->close();
?>