const API_KEY = ''; // Replace with your actual YouTube API key

// Function to fetch search results from YouTube API
function fetchSearchResults(keyword) {
    console.log('Fetching search results from YouTube API...');
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(keyword)}`)
        .then(response => response.json())
        .then(data => data.items)
        .catch(error => {
            throw new Error('An error occurred while fetching YouTube data.');
        });
}

// Function to estimate search volume based on search results
function estimateSearchVolume(searchResults) {
    return searchResults.length;
}

// Function to calculate percentage deviation
function calculateDeviation(actual, estimated) {
    return ((Math.abs(estimated - actual) / actual) * 100).toFixed(2);
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const keyword = document.getElementById('keyword').value;
    const searchVolumeResult = document.getElementById('searchVolumeResult');

    console.log(`User submitted keyword: ${keyword}`);

    fetchSearchResults(keyword)
        .then(searchResults => {
            const estimatedSearchVolume = estimateSearchVolume(searchResults);

            console.log('Search results fetched successfully.');
            console.log(`Estimated search volume: ${estimatedSearchVolume}`);

            searchVolumeResult.innerHTML = `
                Estimated search volume for "${keyword}": ${estimatedSearchVolume} searches`;
        })
        .catch(error => {
            console.error('Error:', error);
            searchVolumeResult.innerHTML = 'An error occurred.';
        });
});
