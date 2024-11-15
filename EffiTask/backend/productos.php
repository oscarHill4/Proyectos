<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$id_producto = $data['id_producto']; 
$nombre_producto = $data['nombre_producto'];
$observaciones = $data['observaciones']; 
$fecha_entrada = $data['fecha_entrada']; 
$fecha_salida = $data['fecha_salida'];

$sql = "INSERT INTO productos (id_producto, nombre_producto, observaciones, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $id_producto, $nombre_producto, $observaciones, $fecha_entrada, $fecha_salida);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Producto registrado exitosamente"]);
} else {
    echo json_encode(["error" => "Error al registrar producto"]);
}

$stmt->close();
$conn->close();
?>