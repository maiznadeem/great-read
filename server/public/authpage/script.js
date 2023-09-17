document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('error');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 200 || response.status === 302) {
                window.location.href = '/admin';
            } else if (response.status === 401) {
                const errorMessage = await response.text();
                errorElement.textContent = errorMessage;
            } else {
                errorElement.textContent = 'An error occurred. Please try again later.';
            }
        } catch (error) {
            console.error('Error:', error);
            errorElement.textContent = 'An error occurred. Please try again later.';
        }
    });
});
