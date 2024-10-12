document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        let valid = true;
        let errors = [];

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            valid = false;
            errors.push('formato de email no válido.');
        }

        // Validar contraseña
        if (password.length < 8) {
            valid = false;
            errors.push('debe contener 8 caracteres como minimo');
        }

        if (!valid) {
            event.preventDefault();
            alert(errors.join('\n'));
        }
    });
});