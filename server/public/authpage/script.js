document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('error');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => {
            if (response.status === 200 || response.status === 302) {
                window.location.href = '/admin';
            } else {
                errorElement.textContent = 'Authentication failed. Please try again.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
