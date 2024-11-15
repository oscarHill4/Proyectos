<?php

include 'conexion.php';

$sql = "
    SELECT
        id_tiempo,
        id_producto, 
        nombre_producto, 
        fecha_salida, 
        nombre_zona, 
        nombre_empleado,
        fecha_asignacion,
        estado
    FROM 
        productos
    LEFT JOIN tiempos ON id_producto = id_producto_tiempo
    LEFT JOIN empleados ON id_empleado_tiempo = cedula
    LEFT JOIN zonas ON zona = id_zonas
    WHERE id_empleado_tiempo IS NOT NULL
";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
    exit;
}

$productos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos);

$conn->close();
?>