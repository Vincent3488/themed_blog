document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/login"]');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.getElementById('popup-close');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const storedData = localStorage.getItem('userRegistrationData');
        const userData = storedData ? JSON.parse(storedData) : null;

        if (userData && userData.email === email && userData.password === password) {
            localStorage.setItem('userSession', JSON.stringify({ email: email }));

            // Show success message
            popupMessage.textContent = 'Login Successful!';
            popup.style.display = 'block';

            // Redirect to home page after closing popup
            closeButton.addEventListener('click', function() {
                popup.style.display = 'none';
                window.location.href = 'index.html'; // Redirect to home page
            });
        } else {
            popupMessage.textContent = 'Login Failed: Invalid email or password.';
            popup.style.display = 'block';
        }
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});

