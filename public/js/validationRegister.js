document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        let valid = true;
        let errors = [];

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const image = document.getElementById('image').value;

        // Validar nombre y apellido
        if (firstName.length < 2) {
            valid = false;
            errors.push('El nombre debe contener 2 caracteres como minimo');
        }
        if (lastName.length < 2) {
            valid = false;
            errors.push('El apellido debe contener 2 caracteres como minimo');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            valid = false;
            errors.push('Debe ser un formato de email');
        }

        // Validar contraseña
        if (password.length < 8) {
            valid = false;
            errors.push('La contraseña debe contener 8 caracteres como minimo');
        }

        // Validación opcional para mayúsculas, minúsculas, número y carácter especial
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        if (password && !passwordRegex.test(password)) {
            errors.push('La contraseña debe contener mayúsculas, minúsculas, un número y también la menos un carácter especial');
        }

        // Validar imagen
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (image) {
            const fileExtension = image.split('.').pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                valid = false;
                errors.push('La imagen debe ser en alguno de estos formatos JPG, JPEG, PNG o GIF');
            }
        }

        if (!valid) {
            event.preventDefault();
            alert(errors.join('\n'));
        }
    });
});