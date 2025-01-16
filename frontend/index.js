async function fetchData(endpoint, elementId) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const listContainer = document.getElementById(elementId);
        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <h3>${item.title || item.name || ''}</h3>
                <p>${item.description || ''}</p>
                <img src="${item.poster || item.image || ''}" alt="${item.title || item.name || ''}" style="width: 100px;">
            `;
            listContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData('/api/movies', 'movie-list');
    fetchData('/api/news', 'news-list');
    fetchData('/api/shop-items', 'shop-list');
});