document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const keywordInput = document.getElementById('keywordInput');
    const searchResult = document.getElementById('searchResult');
    const spinnerEl = document.getElementById('spinner');

    searchButton.addEventListener('click', function() {
        const keyword = keywordInput.value.trim();

        if (keyword === '') {
            searchResult.textContent = 'Please enter a keyword.';
            return;
        }
        spinnerEl.style.display = 'block'; // Show spinner

        const apiKey = ''; //
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const searchVolume = data.pageInfo.totalResults;
                searchResult.textContent = `The keyword "${keyword}" has been searched ${searchVolume} times.`;
            })
            .catch(error => {
                searchResult.textContent = 'An error occurred while fetching data from the API.';
            })
            .finally(() => {
                spinnerEl.style.display = 'none'; // Hide spinner after API call
            });
    });
});
