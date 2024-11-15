<?php
include 'conexion.php';

$id_tiempo = $_POST['id_tiempo']; 
$tiempo_transcurrido = $_POST['tiempo_transcurrido'];

if (!$id_tiempo || !$tiempo_transcurrido) {
    echo json_encode(["error" => "Faltan datos: id_tiempo o tiempo_transcurrido no proporcionados"]);
    exit;
}

$sql = "SELECT id_producto_tiempo, estado FROM tiempos WHERE id_tiempo = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Error al preparar la consulta: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id_tiempo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
} else {
    echo json_encode(["error" => "Asignación no encontrada"]);
    exit;
}

$id_producto = $product['id_producto_tiempo'];
$estado_actual = $product['estado'];

if ($estado_actual == 'finalizado') {
    echo json_encode(["error" => "La asignación ya está finalizada"]);
    exit;
}

$sql_update = "UPDATE tiempos SET estado = 'finalizado' WHERE id_tiempo = ?";
$stmt_update = $conn->prepare($sql_update);
$stmt_update->bind_param("i", $id_tiempo);
$stmt_update->execute();

$sql_insert = "INSERT INTO detalles_tiempos (id_det_tiem_tiempo, tiempo) VALUES (?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("ii", $id_tiempo, $tiempo_transcurrido);
$stmt_insert->execute();

$stmt->close();
$stmt_update->close();
$stmt_insert->close();

echo json_encode(["success" => "Asignación finalizada y tiempo registrado correctamente"]);

$conn->close();
?>