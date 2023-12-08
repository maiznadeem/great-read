document.addEventListener('DOMContentLoaded', function () {
    const resetForm = document.getElementById('resetForm');
    const resetMessage = document.getElementById('resetMessage');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('id');

    resetForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/reset/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password, token, userId })
            });

            const jsonResponse = await response.json();

            if (response.status === 200) {
                resetMessage.innerHTML = jsonResponse.message;
            } else {
                resetMessage.innerHTML = `An error occurred: ${jsonResponse.message}`;
            }
        } catch (error) {
            console.error(error);
            resetMessage.innerHTML = 'An error occurred. Please try again.';
        }
    });
});
