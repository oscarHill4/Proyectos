document.getElementById('form-empleados').addEventListener('submit', function(event) {
    event.preventDefault();

    const id_producto = this.id_producto.value;
    const nombre_producto = this.nombre_producto.value;
    const observaciones = this.observaciones.value;
    const fecha_entrada = this.fecha_entrada.value;
    const fecha_salida = this.fecha_salida.value;
    
    fetch('http://localhost/EffiTask/backend/productos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_producto, nombre_producto, observaciones, fecha_entrada, fecha_salida })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            alert(data.mensaje);
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
    this.id_producto.value = '';
    this.nombre_producto.value = '';
    this.observaciones.value = '';
    this.fecha_entrada.value = '';
    this.fecha_salida.value = '';
});