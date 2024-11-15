<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$nombre_zona = $data['nombre_zona']; 
$cantidad_empleados = $data['cantidad_empleados'];
$cantidad_puestos = $data['cantidad_puestos']; 
$area = $data['area']; 
$observaciones = $data['observaciones'];

$sql = "INSERT INTO zonas (nombre_zona, cantidad_empleados, cantidad_puestos, area, observaciones) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $nombre_zona, $cantidad_empleados, $cantidad_puestos, $area, $observaciones);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Zona registrada exitosamente"]);
} else {
    echo json_encode(["error" => "Error al registrar la zona"]);
}

$stmt->close();
$conn->close();
?>