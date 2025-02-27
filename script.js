
      // Wait for the DOM to load before attaching events
    document.addEventListener('DOMContentLoaded', function () {
        // Get the button and textarea elements
        const searchButton = document.querySelector('.searchbutton');
        const textBox = document.querySelector('.textbox');
  
        // Function to perform the search
        function performSearch() {
          // Get the text content from the textarea and trim extra spaces
          const searchText = textBox.value.trim();
  
          // If there is content in the textarea
          if (searchText !== "") {
            // Encode the content to URL format and create the Google search URL
            const encodedSearch = encodeURIComponent(searchText);
            const googleSearchURL = `https://www.google.com/search?q=${encodedSearch}`;
            
            // Redirect to the Google search page
            window.location.href = googleSearchURL;
          } else {
            alert('Please enter a search term!');
          }
        }
  
        // Add event listener for the button click
        searchButton.addEventListener('click', performSearch);
  
        // Add event listener for pressing "Enter" in the textarea
        textBox.addEventListener('keydown', function(event) {
          // Check if the key pressed is "Enter" (key code 13)
          if (event.key === 'Enter') {
            event.preventDefault();  // Prevents the form from submitting (if inside a form)
            performSearch();         // Trigger the search function
          }
        });
      });