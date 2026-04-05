document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');

    const handleTogglePassword = () => {
        const isPassword = passwordInput.type === 'password';

        passwordInput.type = isPassword ? 'text' : 'password';

        toggleBtn.classList.toggle('fa-eye', !isPassword);
        toggleBtn.classList.toggle('fa-eye-slash', isPassword);
    };

    function logout() {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
    }

    toggleBtn.addEventListener('click', handleTogglePassword);

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";

        const formData = {
            email: loginForm.querySelector('#email').value,
            remember: loginForm.querySelector('#remember').checked
        };

        const submitBtn = loginForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerText;

        submitBtn.innerText = 'AUTHENTICATING....';
        submitBtn.disabled = true;

        console.log('Login attempt initiated:', formData);

        setTimeout(() => {
            alert(`Welcome back! Connection to backend successful for login ${formData.email}`);
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            window.location.href = "index.html";
        }, 1200);
    });
});