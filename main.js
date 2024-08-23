let posts = [];

async function loadPosts(sortBy = 'date', categoryFilter = '') {
    try {
        const response = await fetch('data/posts.json');
        if (!response.ok) {
            throw new Error('Failed to fetch posts.');
        }
        posts = await response.json();

        const blogPostsSection = document.getElementById('blog-posts');
        
        // Sort posts based on the specified criteria
        if (sortBy === 'date') {
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === 'title') {
            posts.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Filter posts based on the selected category
        if (categoryFilter) {
            posts = posts.filter(post => post.category === categoryFilter);
        }

        // Generate HTML for posts
        blogPostsSection.innerHTML = posts.map(post => `
            <article>
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : '<img src="img/placeholder.png" alt="No Image Available" class="post-image">'}
                <h2><a href="post-template.html?id=${post.id}">${post.title}</a></h2>
                <p>${truncateContent(post.excerpt, 100)}</p>
                <p>Tags: ${post.tags.join(', ')}</p>
                <p>Category: ${post.category}</p>
                <p>Author: ${post.author} <span class="author-tick">✔</span></p>
                <div class="share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href + 'post-template.html?id=' + post.id)}" target="_blank" class="share-button">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href + 'post-template.html?id=' + post.id)}" target="_blank" class="share-button">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href + 'post-template.html?id=' + post.id)}" target="_blank" class="share-button">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href + 'post-template.html?id=' + post.id)}" target="_blank" class="share-button">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('blog-posts').innerHTML = '<p>There was an error loading the posts. Please try again later.</p>';
    }
}

function truncateContent(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function sortPosts(sortBy) {
    loadPosts(sortBy);
}

function filterPosts() {
    const categoryFilter = document.getElementById('filter').value;
    loadPosts(undefined, categoryFilter);
}

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});
