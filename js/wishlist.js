document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    console.log('Wishlist:', wishlist);

    document.querySelectorAll('.add-to-wishlist-btn').forEach(button => {
        console.log('Button found:', button);
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            console.log('Button clicked, postId:', postId);
            if (wishlist.includes(postId)) {
                alert('This item is already in your wishlist.');
            } else {
                wishlist.push(postId);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                this.textContent = 'Added to Wishlist';
                this.disabled = true;
            }
        });
    });
});
