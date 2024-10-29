document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.getElementById('popup-close');

    // Function to show the popup with a message
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = 'block';
    }

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Send registration data to the backend
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                // Handle successful registration
                showPopup('Registration Successful!');

                // Save user data to local storage
                localStorage.setItem('userRegistrationData', JSON.stringify({ name, email }));

                // Reset the form fields
                registrationForm.reset();

                // Redirect to login page after closing popup
                closeButton.onclick = function() {
                    popup.style.display = 'none';
                    window.location.href = 'login.html'; // Redirect to login page
                };
            } else {
                // Handle errors
                showPopup('Registration Failed: ' + (result.message || 'Try again.'));
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
