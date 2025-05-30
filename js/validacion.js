document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('singup').addEventListener('click',validateSignupForm);
    document.getElementById('login-btn').addEventListener('click', validateLoginForm);
}); 
function validateSignupForm() {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confipass = document.getElementById('confirm_password').value.trim();
    const box = document.getElementById('box1').checked;

    const regexemail = /^[A-Za-z]{6,8}\d{3,4}@g\.educaand\.es$/;
    const regexpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (!box) return Swal.fire("Error", "No has aceptado la política de privacidad", "error");
    if (!name || !email || !password || !confipass || !box) return Swal.fire("Error", "No puede haber campos vacíos", "error");
    if (name.length < 3) return Swal.fire("Error", "El nombre debe tener al menos 3 caracteres", "error");
    if (!regexemail.test(email)) return Swal.fire("Error", "Formato de email requerido: usuario123@g.educaand.es", "error");
    if (!regexpass.test(password)) return Swal.fire("Error", "La contraseña debe contener 8-16 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número y 1 caracter especial(!@#$%^&*)", "error");
    if (password !== confipass) return Swal.fire("Error", "Las contraseñas no coinciden", "error");

    Swal.fire("¡Éxito!", "Registro completado", "success");
}

function validateLoginForm() {
    event.preventDefault();
    const email = document.getElementById('login_email').value.trim();
    const password = document.getElementById('login_password').value.trim();

    if (!email || !password) {
        return Swal.fire("Error", "Por favor completa todos los campos", "error");
    }
    Swal.fire("¡Éxito!", "Inicio de sesión completado", "success");
}