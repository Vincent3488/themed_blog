document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.querySelector('form[action="/register"]');
    const blogPostSection = document.getElementById('blog-post-section');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.getElementById('popup-close');

    // Check if the user is already registered
    const userData = JSON.parse(localStorage.getItem('userRegistrationData'));
    if (userData) {
        // If user data exists, show the blog post form
        blogPostSection.style.display = 'block';
    } else {
        // If user data does not exist, hide the blog post form and show the registration popup
        blogPostSection.style.display = 'none';
        popupMessage.textContent = 'Please register to add a blog post.';
        popup.style.display = 'block';
    }

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Save user data to local storage
        const userData = { name, email, password };
        localStorage.setItem('userRegistrationData', JSON.stringify(userData));

        // Show success message and redirect
        popupMessage.textContent = 'Registration Successful!';
        popup.style.display = 'block';

        closeButton.addEventListener('click', function() {
            popup.style.display = 'none';
            window.location.href = 'login.html'; // Redirect to login page or any other page
        });
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});
