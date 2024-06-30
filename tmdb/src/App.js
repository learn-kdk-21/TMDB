import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

const apiKey = "b0901754c714f5ebad0bf6b63ca27acd";
function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const fetchMovies = async () => {
    if (inputSearch != "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputSearch}`
      );
      setSearchResult(response.data.results);
      console.log(response.data.results);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchMovies();
  };
  const handleSelectedMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="App">
      <h1>The Movie Database</h1>
      <form onSubmit={handleClick}>
        <input
          type="text"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>
      <div className="movie-list">
        {searchResult.map((movie, index) => {
          return (
            <div
              key={index}
              className="movie"
              onClick={() => handleSelectedMovie(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          );
        })}
      </div>
      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <p>Rating : {selectedMovie.rating}</p>
          <p>Release Date : {selectedMovie.vote_average}/10</p>
        </div>
      )}
    </div>
  );
}

export default App;
