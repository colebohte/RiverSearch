document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".searchbutton");
  const textBox = document.querySelector(".textbox");

  function isValidURL(input) {
      try {
          const url = new URL(input);
          return url.protocol === "http:" || url.protocol === "https:";
      } catch (_) {
          return false;
      }
  }

  function performSearch() {
      const userInput = textBox.value.trim();

      if (userInput !== "") {
          if (isValidURL(userInput)) {
              // Redirect directly to the typed URL
              window.location.href = userInput;
          } else {
              // Redirect to results page with query
              window.location.href = `results.html?query=${encodeURIComponent(userInput)}`;
          }
      } else {
          alert("Please enter a search term or URL!");
      }
  }

  searchButton.addEventListener("click", performSearch);
  textBox.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          event.preventDefault();
          performSearch();
      }
  });
});
