// Function to load and display blog posts
function loadBlogPosts() {
    // Get blog posts from localStorage or initialize an empty array
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Get the blog post list container
    const blogPostList = document.getElementById('blog-post-list');
    blogPostList.innerHTML = ''; // Clear existing posts

    // Iterate over each blog post and create HTML elements
    blogPosts.forEach(post => {
        // Create HTML for each post
        const postElement = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card card-container">
                    <img src="${post.image}" class="card-img-top" alt="${post.title}">
                    <button class="btn btn-danger delete-btn" onclick="deletePost('${post.id}')">Delete</button>
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <a href="post-detail.html?id=${post.id}" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        `;
        // Append the created HTML to the blog post list
        blogPostList.innerHTML += postElement;
    });
}

// Function to delete a blog post
function deletePost(postId) {
    // Get blog posts from localStorage
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    // Filter out the post to be deleted
    blogPosts = blogPosts.filter(post => post.id !== postId);
    
    // Save the updated list back to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    
    // Reload the blog posts to reflect changes
    loadBlogPosts();
}

// Call the function to load posts on page load
document.addEventListener('DOMContentLoaded', loadBlogPosts);
