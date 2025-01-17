// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Get the ID of the target section
            const targetElement = document.getElementById(targetId); // Select the target section
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the target section
            } else {
                console.error(`Element with ID "${targetId}" not found.`); // Error handling for non-existent elements
            }
        });
    });

    // Toggle menu for small screens
    const menuToggle = document.getElementById('menu-toggle'); // Get the menu toggle button
    const navLinks = document.getElementById('nav-links'); // Get the navigation links

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('visible'); // Toggle visibility of the nav links
        });
    }

    // About section toggle
    const toggleButton = document.getElementById('toggle-content'); // Get the toggle button for the About section
    const aboutContent = document.getElementById('content'); // Get the content of the About section

    if (toggleButton && aboutContent) {
        toggleButton.addEventListener('click', () => {
            aboutContent.classList.toggle('active'); // Toggle visibility of the About content
            toggleButton.textContent = aboutContent.classList.contains('active') ? 'Show Less' : 'Show More'; // Change toggle button text
        });
    }

    // Characters section toggle
    const toggleCharactersButton = document.getElementById('toggle-characters'); // Get the toggle button for characters
    const moreCharacters = document.getElementById('more-characters'); // Get the additional characters section

    if (toggleCharactersButton && moreCharacters) {
        toggleCharactersButton.addEventListener('click', () => {
            moreCharacters.classList.toggle('hidden'); // Toggle visibility of more characters
            toggleCharactersButton.textContent = moreCharacters.classList.contains('hidden') ? 'Show More' : 'Show Less'; // Change button text
        });
    }

    // Fetch news articles dynamically if you have a backend
    const newsContainer = document.querySelector('.news-container'); // Get the news container for displaying articles

    if (newsContainer) {
        fetch('/api/news') // Change URL as per your backend setup
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok'); // Handle network errors
                }
                return response.json(); // Parse the JSON data
            })
            .then(newsData => {
                // Clear existing news items before appending to avoid duplicates
                newsContainer.innerHTML = '';

                // Loop through each news item and create a corresponding element
                newsData.forEach(news => {
                    const newsItem = document.createElement('div'); // Create a new news article div
                    newsItem.className = 'news-article'; // Assign class name
                    newsItem.innerHTML = `
                        <img src="${news.image}" alt="${news.title}" />
                        <h4>${news.title}</h4>
                        <p>${news.description}</p>
                        <button>Learn More</button>
                    `;
                    newsContainer.appendChild(newsItem); // Append the news item to the container
                });
            })
            .catch(error => {
                console.error('Error fetching news:', error); // Log errors if the fetch fails
            });
    }
});