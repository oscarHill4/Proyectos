<?php
include 'conexion.php';

$sql = "SELECT id_producto, nombre_producto, observaciones, fecha_salida, fecha_salida FROM productos";
$result = $conn->query($sql);

if (!$result) {
    die("Error en la consulta: " . $conn->error);
}

$empleados = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $empleados[] = $row;
    }
}
echo json_encode($empleados);
$conn->close();
?>