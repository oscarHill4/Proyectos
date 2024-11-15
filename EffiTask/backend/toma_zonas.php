<?php
include 'conexion.php';

$sql = "SELECT id_zonas, nombre_zona FROM zonas";
$result = $conn->query($sql);

if (!$result) {
    die("Error en la consulta: " . $conn->error);
}

$zonas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $zonas[] = $row;
    }
}
echo json_encode($zonas);
$conn->close();
?>