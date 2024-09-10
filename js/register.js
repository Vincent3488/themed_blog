document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/register"]');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.getElementById('popup-close');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Save user data to local storage
        const userData = { name, email, password };
        localStorage.setItem('userRegistrationData', JSON.stringify(userData));

        // Show success message
        popupMessage.textContent = 'Registration Successful!';
        popup.style.display = 'block';

        // Redirect to login after closing popup
        closeButton.addEventListener('click', function() {
            popup.style.display = 'none';
            window.location.href = 'login.html'; // Redirect to login page
        });
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});

