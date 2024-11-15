<?php

include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id_producto']) && isset($data['id_empleado'])) {
    $id_producto = $data['id_producto'];
    $id_empleado = $data['id_empleado'];

    $sql_check = "SELECT * FROM tiempos WHERE id_producto_tiempo = ? AND id_empleado_tiempo = ?";
    $stmt_check = $conn->prepare($sql_check);
    
    if ($stmt_check === false) {
        echo json_encode(["error" => "Error al preparar la consulta de verificación: " . $conn->error]);
        exit;
    }

    $stmt_check->bind_param("ii", $id_producto, $id_empleado);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        echo json_encode(["error" => "Este producto ya fue asignado a este empleado."]);
        exit;
    }

    $sql = "INSERT INTO tiempos (id_empleado_tiempo, id_producto_tiempo) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo json_encode(["error" => "Error al preparar la consulta: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("ii", $id_empleado, $id_producto);

    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "Producto asignado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al asignar producto: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Datos incompletos: 'id_producto' y 'id_empleado' son requeridos"]);
}

?>