document.getElementById('form-zonas').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre_zona = this.nombre_zona.value;
    const cantidad_empleados = this.cantidad_empleados.value;
    const cantidad_puestos = this.cantidad_puestos.value;
    const area = this.area.value;
    const observaciones = this.observaciones.value;

    fetch('http://localhost/EffiTask/backend/zonas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre_zona, cantidad_empleados, cantidad_puestos, area, observaciones })
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
    this.nombre_zona.value = '';
    this.cantidad_empleados.value = '';
    this.cantidad_puestos.value = '';
    this.area.value = '';
    this.observaciones.value = '';
});