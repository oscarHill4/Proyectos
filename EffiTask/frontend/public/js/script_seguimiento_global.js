document.addEventListener('DOMContentLoaded', function() {
    cargar_productos_asignados();
});

function cargar_productos_asignados() {
    fetch('http://localhost/EffiTask/backend/toma_productos_asignados.php')
        .then(response => response.json())
        .then(data => {
            const lista_productos = document.getElementById('lista-productos');
            lista_productos.innerHTML = '';

            data.forEach(producto => {
                const div_producto = document.createElement('div');
                div_producto.classList.add('producto-item');

                const id_producto = document.createElement('div');
                id_producto.classList.add('id-producto');
                id_producto.textContent = producto.id_producto;

                const nombre_producto = document.createElement('div');
                nombre_producto.classList.add('nombre-producto');
                nombre_producto.textContent = producto.nombre_producto;

                const fecha_salida = document.createElement('div');
                fecha_salida.classList.add('fecha-salida');
                fecha_salida.textContent = producto.fecha_salida;

                const nombre_zona = document.createElement('div');
                nombre_zona.classList.add('nombre-zona');
                nombre_zona.textContent = producto.nombre_zona;

                const nombre_empleado = document.createElement('div');
                nombre_empleado.classList.add('nombre-empleado');
                nombre_empleado.textContent = producto.nombre_empleado;

                const crono = document.createElement('div');
                crono.classList.add('crono');
                crono.id = `reloj_${producto.id_tiempo}`;

                const btn_finalizar = document.createElement('button');
                btn_finalizar.classList.add('finalizar-producto');
                btn_finalizar.addEventListener('click', () => finalizar_producto(producto.id_tiempo, producto.fecha_asignacion));

                div_producto.appendChild(id_producto);
                div_producto.appendChild(nombre_producto);
                div_producto.appendChild(fecha_salida);
                div_producto.appendChild(nombre_zona);
                div_producto.appendChild(nombre_empleado);
                div_producto.appendChild(crono);
                div_producto.appendChild(btn_finalizar);

                lista_productos.appendChild(div_producto);

                if (producto.estado == 'finalizado') {
                    btn_finalizar.textContent = 'Reiniciar';
                    crono.textContent = "Finalizó";
                } else {
                    btn_finalizar.textContent = 'Finalizar';
                    iniciar_reloj(producto.id_tiempo, producto.fecha_asignacion);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar productos asignados:', error);
            alert('Hubo un error al cargar los productos asignados.');
        });
}

let intervalosActivos = {};

function iniciar_reloj(id_tiempo, fecha_asignacion){
    const div_reloj = document.getElementById(`reloj_${id_tiempo}`);

    if(!div_reloj){
        console.error(`No se encontró el reloj con id: 'reloj_${id_tiempo}'`);
        return;
    }

    const fecha_asignacion_date = new Date(fecha_asignacion);

    if(intervalosActivos[id_tiempo]){
        return;
    }

    const intervalo = setInterval(() => {
        const tiempo_transcurrido = Date.now() - fecha_asignacion_date.getTime();
        actualizar_reloj(div_reloj, tiempo_transcurrido);
    }, 1000);

    intervalosActivos[id_tiempo] = intervalo;
}

function actualizar_reloj(div_reloj, tiempo_ms){
    const horas = Math.floor(tiempo_ms / 3600000);
    const minutos = Math.floor((tiempo_ms % 3600000) / 60000);
    const segundos = Math.floor((tiempo_ms % 60000) / 1000);
    div_reloj.textContent = `${pad_cero(horas)}:${pad_cero(minutos)}:${pad_cero(segundos)}`;
}

function pad_cero(valor){
    return valor < 10 ? '0' + valor : valor;
}

function finalizar_producto(id_tiempo, fecha_asignacion){
    const tiempo_transcurrido = calcular_tiempo_transcurrido(fecha_asignacion);
    console.log(id_tiempo)

    fetch('http://localhost/EffiTask/backend/finalizar_producto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id_tiempo=${id_tiempo}&tiempo_transcurrido=${tiempo_transcurrido}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            alert('Producto finalizado y tiempo registrado.');
            location.reload();
        } else{
            alert(data.error || 'Hubo un error al actualizar el estado.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud.');
    });
}

function calcular_tiempo_transcurrido(fecha_asignacion){
    const fecha_asignacion_date = new Date(fecha_asignacion);
    const tiempo_trancurrido = Date.now() - fecha_asignacion_date.getTime();
    return tiempo_trancurrido;
}