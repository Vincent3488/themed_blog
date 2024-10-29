document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/login"]');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.getElementById('popup-close');

    // Function to show the popup with a message
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = 'block';
    }

    // Handle form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Send login data to the backend
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                // On success, show success message
                showPopup('Login Successful!');

                // Save the JWT token from the backend response to localStorage
                if (result.token) {
                    localStorage.setItem('authToken', result.token);
                }

                // Redirect to home page after closing the popup
                closeButton.onclick = function() {
                    popup.style.display = 'none';
                    window.location.href = 'index.html'; // Redirect to home page
                };
            } else {
                // On failure, show error message from the backend
                showPopup('Login Failed: ' + (result.message || 'Invalid email or password.'));
            }
        } catch (error) {
            // Handle network errors
            showPopup('An error occurred. Please try again later.');
        }
    });

    // Close popup
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});
