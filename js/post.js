async function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Check if the postId is valid
    if (!postId) {
        document.getElementById('post-content').innerHTML = '<p>Post not found</p>';
        return;
    }

    try {
        const response = await fetch('data/posts.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const posts = await response.json();
        const post = posts.find(p => p.id === postId);

        // Check if the post exists
        if (post) {
            document.getElementById('post-content').innerHTML = `
                <h1>${post.title}</h1>
                <p><em>${post.date}</em></p>
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : '<img src="img/placeholder.png" alt="No Image Available" class="post-image">'}
                <div class="post-content">${post.content}</div>
                <p>Author: ${post.author} <span class="author-tick">✔</span></p>
                <div class="share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            `;
        } else {
            document.getElementById('post-content').innerHTML = '<p>Post not found</p>';
        }
    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-content').innerHTML = '<p>There was an error loading the post. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadPost);
