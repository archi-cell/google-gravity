document.addEventListener('DOMContentLoaded', () => {
    const elements = [
        document.getElementById('title'),
        document.getElementById('searchInput'),
        document.getElementById('searchBtn'),
        document.getElementById('clearBtn'),
        document.getElementById('historyTitle')
    ];

    const gravity = 0.2;  // Slow falling gravity
    const bounce = 0.6;  // Stronger bounce
    let windowHeight = window.innerHeight;

    elements.forEach(el => {
        let velocityY = 0;  // Vertical velocity (falling speed)
        let isFalling = true;

        // Set initial random top position and center horizontal position for each element
        el.style.position = 'absolute';
        el.style.top = `${Math.random() * 50}px`;
        el.style.left = `${(window.innerWidth - el.offsetWidth) / 2}px`;  // Center horizontally

        const fall = () => {
            if (isFalling) {
                const rect = el.getBoundingClientRect();
                velocityY += gravity;  // Increase vertical speed by gravity
                el.style.top = `${rect.top + velocityY}px`;  // Move element downwards

                // Check if the element hits the bottom of the screen
                if (rect.bottom >= windowHeight) {
                    velocityY = -velocityY * bounce;  // Reverse direction with bounce factor

                    // Add bounce animation on contact with the bottom
                    el.style.animation = "bounce 0.5s";

                    if (Math.abs(velocityY) < 0.5) isFalling = false;  // Stop when bounce becomes too small
                }

                requestAnimationFrame(fall);  // Continuously animate the fall
            }
        };

        // Re-trigger fall on click
        el.addEventListener('click', () => {
            velocityY = 0;  // Reset vertical velocity
            isFalling = true;
            el.style.animation = "";  // Reset animation before falling again
            fall();  // Trigger the fall again
        });

        // Start the initial fall for each element
        fall();
    });

    // Handle window resize to adjust fall bounds
    window.addEventListener('resize', () => {
        windowHeight = window.innerHeight;
        elements.forEach(el => {
            el.style.left = `${(window.innerWidth - el.offsetWidth) / 2}px`;  // Re-center horizontally on resize
        });
    });

    // Handle keyboard "Enter" key to trigger search
    document.getElementById('searchInput').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            alert(`Search for: ${event.target.value}`);
        }
    });

    // Add search button interaction
    document.getElementById('searchBtn').addEventListener('click', () => {
        const searchTerm = document.getElementById('searchInput').value;
        if (searchTerm) {
            alert(`Search for: ${searchTerm}`);
        }
    });

    // Add clear button functionality
    document.getElementById('clearBtn').addEventListener('click', () => {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = ''; // Clear the history
    });
});
