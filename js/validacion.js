document.addEventListener('DOMContentLoaded', function() {
    const setupForm = (formId, isLogin = false) => {
        const form = document.querySelector(formId);
        const inputs = form.querySelectorAll('.input');
        const submitBtn = form.querySelector('button');

        inputs.forEach(input => {
            // Efecto focus
            input.addEventListener('focus', function() {
                const A = this.parentNode.querySelector('.input-hint');
                if (a) hint.style.opacity = '1';
            });

            // Efecto blur
            input.addEventListener('blur', function() {
                const a = this.parentNode.querySelector('.input-hint');
                if (a) a.style.opacity = '0';
                if (!isLogin) validateField(this);
            });

            // Validación en tiempo real 
            if (!isLogin) {
                input.addEventListener('input', function() {
                    validateField(this);
                });
            }
        });

        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (isLogin) validateLoginForm();
            else validateSignupForm();
        });
    };

    setupForm('.singup form');
    setupForm('.login form', true);

    function validateSignupForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confipass = document.getElementById('confirm_password').value.trim();
        const box = document.getElementById('box1').checked;

        const regexemail = /^[A-Za-z]{6,8}\d{3,4}@g\.educaand\.es$/;
        const regexpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;


        if (!box) return Swal.fire("Error", "No has aceptado la política de privacidad", "error");
        if (!name || !email || !password || !confipass) return Swal.fire("Error", "No puede haber campos vacíos", "error");
        if (name.length < 3) return Swal.fire("Error", "El nombre debe tener al menos 3 caracteres", "error");
        if (!regexemail.test(email)) return Swal.fire("Error", "Formato de email requerido: usuario123@g.educaand.es", "error");
        if (!regexpass.test(password)) return Swal.fire("Error", "La contraseña debe contener 8-16 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número", "error");
        if (password !== confipass) return Swal.fire("Error", "Las contraseñas no coinciden", "error");

        Swal.fire("¡Éxito!", "Registro completado", "success");
    }


    function validateLoginForm() {
        const email = document.getElementById('login_email').value.trim();
        const password = document.getElementById('login_password').value.trim();

        if (!email || !password) {
            return Swal.fire("Error", "Por favor completa todos los campos", "error");
        }

        Swal.fire("¡Éxito!", "Inicio de sesión completado", "success");
    }

    function validateField(field) {
        field.classList.remove('valid', 'invalid');
        
        if (!field.value.trim()) return;
        let esvalido = true;
        switch(field.id) {
            case 'name':
                esvalido = field.value.trim().length >= 3;
                break;
            case 'email':
                esvalido = /^[A-Za-z]{6,8}\d{3,4}@g\.educaand\.es$/.test(field.value.trim());
                break;
            case 'password':
                esvalido = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(field.value.trim());
                break;
            case 'confirm_password':
                const password = document.getElementById('password').value.trim();
                esvalido = field.value.trim() === password;
                break;
        }
        field.classList.add(esvalido ? 'valid' : 'invalid');
    }
});