const btn_inicio_sesion = document.getElementById('btn-inicio-sesion');
const btn_registro = document.getElementById('btn-registro');
const contenedor = document.querySelector('.contenedor');

btn_inicio_sesion.addEventListener('click', function(){
    contenedor.classList.remove('toggle');
});

btn_registro.addEventListener('click', function(){
    contenedor.classList.add('toggle');
});

document.getElementById('form-iniciar-sesion').addEventListener('submit', function(event) {
    event.preventDefault();

    const correo = this.correo.value;
    const contraseña = this.contraseña.value;

    fetch('http://localhost/EffiTask/backend/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contraseña })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            window.location.href = data.redirect;
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
    this.correo.value = '';
    this.contraseña.value = '';
    
});

document.getElementById('form-registrarse').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = this.usuario.value;
    const correo = this.correo.value;
    const contraseña = this.contraseña.value;

    fetch('http://localhost/EffiTask/backend/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, correo, contraseña })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            alert(data.mensaje); // Mensaje de registro exitoso
            // Aquí puedes redirigir o hacer otras acciones
        } else {
            alert(data.error); // Mostrar el error si lo hay
        }
    })
    .catch(error => console.error('Error:', error));

    this.usuario.value = '';
    this.correo.value = '';
    this.contraseña.value = '';
});