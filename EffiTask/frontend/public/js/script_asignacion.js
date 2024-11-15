function cargar_productos() {
    fetch('http://localhost/EffiTask/backend/toma_productos.php')
        .then(response => response.json())
        .then(data => {
            const lista_productos = document.getElementById('lista-productos');
            lista_productos.innerHTML = '';

            data.forEach(producto => {
                const info_producto = document.createElement('div');
                info_producto.className = 'item';

                const id_producto = document.createElement('div');
                id_producto.className = 'id_producto'; 
                id_producto.textContent = `${producto.id_producto}`;

                const nombre_producto = document.createElement('div');
                nombre_producto.className = 'nombre_producto'; 
                nombre_producto.textContent = `${producto.nombre_producto}`;

                const fecha_salida = document.createElement('div');
                fecha_salida.className = 'fecha_salida'; 
                fecha_salida.textContent = `${producto.fecha_salida}`;

                const observaciones = document.createElement('div');
                observaciones.className = 'observaciones'; 
                observaciones.textContent = `${producto.observaciones}`;

                const sel_empleado = document.createElement('select');
                sel_empleado.className = 'sel_empleado';

                const opcionDefault = document.createElement('option');
                opcionDefault.value = "";
                opcionDefault.textContent = "Seleccione empleado";
                opcionDefault.disabled = true;
                opcionDefault.selected = true;
                sel_empleado.appendChild(opcionDefault);

                fetch('http://localhost/EffiTask/backend/toma_empleados.php')
                    .then(response => response.json())
                    .then(empleados => {
                        empleados.forEach(empleado => {
                            const opcion = document.createElement('option');
                            opcion.value = empleado.cedula;
                            opcion.textContent = empleado.nombre_empleado;
                            sel_empleado.appendChild(opcion);
                        });
                    })
                    .catch(error => console.error('Error al cargar empleados:', error));

                const btn_asig = document.createElement('button');
                btn_asig.className = 'btn_asig';
                btn_asig.textContent = `Asignar`;

                info_producto.appendChild(id_producto);
                info_producto.appendChild(nombre_producto);
                info_producto.appendChild(fecha_salida);
                info_producto.appendChild(observaciones);
                info_producto.appendChild(sel_empleado);
                info_producto.appendChild(btn_asig);

                lista_productos.appendChild(info_producto);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', cargar_productos);

document.getElementById('lista-productos').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('btn_asig')) {
        const productoDiv = event.target.closest('.item'); 
        const id_producto = productoDiv.querySelector('.id_producto').textContent;
        const sel_empleado = productoDiv.querySelector('.sel_empleado');
        const empleadoSeleccionado = sel_empleado.value;

        if (empleadoSeleccionado === "") {
            alert('Por favor, seleccione un empleado.');
            return;
        }

        const asignacionData = {
            id_producto: id_producto,
            id_empleado: empleadoSeleccionado
        };

        fetch('http://localhost/EffiTask/backend/asignar_producto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asignacionData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje) {
                alert(data.mensaje);
            } else if (data.error) {
                alert(data.error); 
            } else {
                alert('Respuesta inesperada del servidor.');
            }
        })
        .catch(error => {
            console.error('Error al asignar producto:', error);
            alert('Hubo un error al asignar el producto.');
        });
    }
});