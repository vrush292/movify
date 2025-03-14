document.getElementById('switch-to-register').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
});

document.getElementById('switch-to-login').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
});

document.addEventListener("DOMContentLoaded", function() {
    const flashMessages = document.getElementById('flash-messages');
    if (flashMessages) {
        setTimeout(() => {
            flashMessages.classList.add('fade-out');
            setTimeout(() => {
                flashMessages.remove(); // Remove from DOM after fade out
            }, 1000); // Match this duration with the CSS transition duration
        }, 1000); // Time before starting to fade out (3 seconds)
    }

    const flashMessagesRegister = document.getElementById('flash-messages-register');
    if (flashMessagesRegister) {
        setTimeout(() => {
            flashMessagesRegister.classList.add('fade-out');
            setTimeout(() => {
                flashMessagesRegister.remove(); // Remove from DOM after fade out
            }, 1000); // Match this duration with the CSS transition duration
        }, 1000); // Time before starting to fade out (3 seconds)
    }
});


//home page scripting

function searchMovie() {
    const query = document.getElementById('search-bar').value;
}

function showGenres() {
    // Implement genre search functionality
}


function toggleWishlist(movieId) {
    // Get CSRF token from a hidden input field
    const csrfToken = document.querySelector('input[name="csrf_token"]').value;

    fetch(`/toggle_wishlist/${movieId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken // Include CSRF token in the headers
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            throw new Error('Failed to update wishlist.'); // Handle non-200 responses
        }
    })
    .then(data => {
        // Check the status from the response
        if (data.status === 'success') {
            showFlashMessage('Wishlist updated successfully!', 'success');
            // Change the button text based on the current state
            const button = document.querySelector('.wishlist-button');
            button.textContent = button.textContent.includes('Add') ? 'Remove from Wishlist' : 'Add to Wishlist';
        } else {
            showFlashMessage('An unexpected error occurred.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFlashMessage('An error occurred while updating the wishlist: ' + error.message, 'error');
    });
}

// Function to show flash messages
function showFlashMessage(message, type) {
    const flashMessagesDiv = document.getElementById('flash-messages');
    flashMessagesDiv.innerHTML = message;
    flashMessagesDiv.className = 'flash-messages flash-' + type; // Set the class based on the type
    flashMessagesDiv.style.display = 'block'; // Show the flash message

    // Center the flash message
    flashMessagesDiv.style.position = 'fixed';
    flashMessagesDiv.style.top = '50%';
    flashMessagesDiv.style.left = '50%';
    flashMessagesDiv.style.transform = 'translate(-50%, -50%)'; // Center it

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
        flashMessagesDiv.style.display = 'none';
    }, 3000);
}
function toggleGenreDropdown() {
    const dropdown = document.getElementById('genre-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function updateGenreForm() {
    const select = document.getElementById('genre-select');
    const form = document.getElementById('genre-form');
    form.action = `/movies_by_genre/${select.value}`; // Update the form action based on selected genre
}