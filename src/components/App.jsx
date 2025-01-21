import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetails from "../pages/MoviesDetailsPage";
import MovieCast from "./MovieCast/MovieCast";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Lion");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const fetchedMovies = await fetchMovies(query);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error(error);
      }
    };

    getMovies();
  }, [query]);

  if (movies.length === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage movies={movies} />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<MovieCast />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
