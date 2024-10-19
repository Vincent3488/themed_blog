document.getElementById('add-post-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    // Check if all fields are filled
    if (title && description && content && imageFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const imageDataUrl = reader.result;

            // Create a new post object
            const newPost = {
                id: Date.now(),
                title: title,
                description: description,
                content: content,
                image: imageDataUrl
            };

            // Save the post to localStorage
            let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            blogPosts.push(newPost);
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

            // Redirect to the blog page
            window.location.href = 'index.html'; // Modify this to your blog page
        };

        reader.readAsDataURL(imageFile);
    }
});