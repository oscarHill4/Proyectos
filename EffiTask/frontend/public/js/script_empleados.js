document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost/EffiTask/backend/toma_zonas.php')
        .then(response => response.json())
        .then(zonas => {
            const sel_zona = document.getElementById('zona');
            zonas.forEach(zona => {
                const option = document.createElement('option');
                option.value = zona.id_zonas;
                option.textContent = zona.nombre_zona;
                sel_zona.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar zonas:', error));
});

document.getElementById('form-empleados').addEventListener('submit', function(event) {
    event.preventDefault();

    const cedula = this.cedula.value;
    const nombre_empleado = this.nombre_empleado.value;
    const zona = this.zona.value;
    const cargo = this.cargo.value;
    const telefono_empleado = this.telefono_empleado.value;

    fetch('http://localhost/EffiTask/backend/empleados.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cedula, nombre_empleado, zona, cargo, telefono_empleado })
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
    this.zona.style.opacity = '0.6';
    this.cedula.value = '';
    this.nombre_empleado.value = '';
    this.zona.value = '';
    this.cargo.value = '';
    this.telefono_empleado.value = '';
});

document.getElementById('zona').addEventListener('change', function() {
    if (this.value) {
        this.style.opacity = '1';
    }
});