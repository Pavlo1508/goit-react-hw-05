import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { fetchMovies } from "../services/api";

const MoviesPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || "");
  const [movies, setMovies] = useState(location.state?.movies || []);

  const handleSearch = useCallback(async () => {
    if (query.trim() === "") return;
    try {
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [query]);

  useEffect(() => {
    if (location.state?.query && !movies.length) {
      handleSearch();
    }
	}, [location.state, handleSearch, movies.length]);
	
	const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Navigation />
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: "/movies", query, movies }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
