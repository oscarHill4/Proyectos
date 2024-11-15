<?php
include 'conexion.php';

// Obtener los datos enviados en la solicitud POST
$id_tiempo = $_POST['id_tiempo'];  // Aquí se recibe el id_tiempo
$tiempo_transcurrido = $_POST['tiempo_transcurrido'];   // Recibimos el tiempo transcurrido

// Depuración: Verificar que recibimos correctamente los datos
if (!$id_tiempo || !$tiempo_transcurrido) {
    echo json_encode(["error" => "Faltan datos: id_tiempo o tiempo_transcurrido no proporcionados"]);
    exit;
}

// Verificar si el id_tiempo existe en la base de datos
$sql = "SELECT id_producto_tiempo, estado FROM tiempos WHERE id_tiempo = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Error al preparar la consulta: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id_tiempo);
$stmt->execute();
$result = $stmt->get_result();

// Depuración: Verificar el resultado de la consulta
if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
} else {
    echo json_encode(["error" => "Asignación no encontrada"]);
    exit;
}

// Si la asignación existe, continuar con el procesamiento
$id_producto = $product['id_producto_tiempo'];
$estado_actual = $product['estado'];

// Verificar si la asignación ya está finalizada
if ($estado_actual == 'finalizado') {
    echo json_encode(["error" => "La asignación ya está finalizada"]);
    exit;
}

// Si no está finalizada, actualizar el estado a 'finalizado'
$sql_update = "UPDATE tiempos SET estado = 'finalizado' WHERE id_tiempo = ?";
$stmt_update = $conn->prepare($sql_update);
$stmt_update->bind_param("i", $id_tiempo);
$stmt_update->execute();

// Insertar el tiempo transcurrido en la tabla detalles_tiempos
$sql_insert = "INSERT INTO detalles_tiempos (id_det_tiem_tiempo, tiempo) VALUES (?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("ii", $id_tiempo, $tiempo_transcurrido);  // Usamos id_tiempo y tiempo transcurrido
$stmt_insert->execute();

// Cerrar las consultas
$stmt->close();
$stmt_update->close();
$stmt_insert->close();

// Respuesta exitosa
echo json_encode(["success" => "Asignación finalizada y tiempo registrado correctamente"]);

$conn->close();
?>