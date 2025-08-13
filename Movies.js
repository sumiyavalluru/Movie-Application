const API_KEY = "cbcf2af0";

// Auth checking
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});

async function searchMovies() {
  let movieName = document.getElementById("movieInput").value.trim();
  let container = document.getElementById("moviesContainer");

  if (!movieName) {
    container.innerHTML = `<div class="no-movies">Please enter a movie name</div>`;
    return;
  }

  let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`;
  let res = await fetch(url);
  let data = await res.json();

  if (data.Response === "True") {
    displayMovies(data.Search);
  } else {
    container.innerHTML = `<div class="no-movies">No movies found</div>`;
  }
}

async function displayMovies(movies) {
  let container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  for (let movie of movies) {
    let movieDetails = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie.Title}`);
    let details = await movieDetails.json();

    let card = document.createElement("div");
    card.classList.add("movie-card");

    let poster = details.Poster !== "N/A" 
      ? details.Poster 
      : "https://via.placeholder.com/250x350?text=No+Poster+Available";

    card.innerHTML = `
      <img src="${poster}" alt="${details.Title}">
      <div class="movie-details">
        <h3>${details.Title}</h3>
        <p><strong>Year:</strong> ${details.Year}</p>
        <p><strong>Released:</strong> ${details.Released}</p>
        <p><strong>Director:</strong> ${details.Director}</p>
      </div>
    `;

    container.appendChild(card);
  }
}
