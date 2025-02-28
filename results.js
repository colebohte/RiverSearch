document.addEventListener("DOMContentLoaded", async function () {
    const resultsContainer = document.querySelector(".results-container");
    const searchTabButton = document.querySelector(".searchtab");
    const imageTabButton = document.querySelector(".imagetab");
    const SERPER_API_KEY = "cc2470781e50b266d2669378784e6af12e925730"; // Serper API Key

    let searchType = "web"; // Default search type

    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("query");

    if (!searchQuery) {
        resultsContainer.innerHTML = "<h1>Error loading results.</h1><p>No search query provided.</p>";
        return;
    }

    async function fetchSearchResults(query, type) {
        let url = "https://google.serper.dev/search";
        let postData = { q: query };

        if (type === "images") {
            url = "https://google.serper.dev/images";
        }

        try {
            resultsContainer.innerHTML = "<p>Loading...</p>"; // Loading indicator
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": SERPER_API_KEY,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) throw new Error("Failed to fetch results");

            const data = await response.json();
            displayResults(data, type);
        } catch (error) {
            console.error("Error fetching search results:", error);
            resultsContainer.innerHTML = `<h1>Error loading results.</h1><p>Failed to load results. Check API key.</p>`;
        }
    }

    function displayResults(data, type) {
        resultsContainer.innerHTML = ""; // Clear results

        if (type === "web") {
            if (data.organic && data.organic.length > 0) {
                data.organic.forEach((result) => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result-item");
                    resultItem.innerHTML = `<h3><a href="${result.link}" target="_blank">${result.title}</a></h3><p>${result.snippet || "No description available."}</p>`;
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.innerHTML = "<h1>Error loading results.</h1><p>No web search results found.</p>";
            }
        } else if (type === "images") {
            if (data.images_results && data.images_results.length > 0) {
                data.images_results.forEach((result) => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result-item");
                    resultItem.innerHTML = `<img src="${result.image}" alt="${result.title}" style="max-width: 200px; max-height: 200px;">`;
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.innerHTML = "<h1>Error loading results.</h1><p>No image search results found.</p>";
            }
        }
    }

    // Event listeners for tab buttons
    searchTabButton.addEventListener("click", () => {
        searchType = "web";
        searchTabButton.classList.add("active");
        imageTabButton.classList.remove("active");
        fetchSearchResults(searchQuery, searchType);
    });

    imageTabButton.addEventListener("click", () => {
        searchType = "images";
        imageTabButton.classList.add("active");
        searchTabButton.classList.remove("active");
        fetchSearchResults(searchQuery, searchType);
    });

    fetchSearchResults(searchQuery, searchType); // Initial search
});