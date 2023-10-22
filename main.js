const apiKey = "";
const api = "https://api.themoviedb.org/3";

const searchButton = document.getElementById("search-button");
const movieInput = document.getElementById("movie-input");
const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieDescription = document.getElementById("movie-description");
const movieGenre = document.getElementById("movie-genre");
const movieRating = document.getElementById("movie-rating");

const searchMovie = (movieName) => {
  axios
    .get(`${api}/search/movie?api_key=${apiKey}&query=${movieName}`)
    .then((res) => {
      const movieData = res.data.results[0];

      movieTitle.innerHTML = movieData.title;
      movieDescription.innerHTML = movieData.overview;
      movieRating.innerHTML = `Rating: ${movieData.vote_average}`;

      const poster = movieData.poster_path;
      if (poster) {
        moviePoster.src = `https://image.tmdb.org/t/p/w500${poster}`;
      }

      getGenre(movieData.genre_ids);
    })
    .catch((error) => {
      console.error("Error searching for the movie:", error);
    });
};

const getGenre = (genreIds) => {
  axios
    .get(`${api}/genre/movie/list?api_key=${apiKey}`)
    .then((res) => {
      const genres = res.data.genres;

      const movieGenres = genres.filter((genre) => genreIds.includes(genre.id));

      const genreNames = movieGenres.map((genre) => genre.name);
      movieGenre.innerHTML = `Genres: ${genreNames.join(", ")}`;
    })
    .catch((error) => {
      console.error("Error looking for movie genres:", error);
    });
};
searchButton.addEventListener("click", () => {
  const movieName = movieInput.value;
  if (movieName) {
    searchMovie(movieName);
  }
});
