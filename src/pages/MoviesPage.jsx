import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { fetchMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";"query"
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      const getMovies = async () => {
        try {
          const fetchedMovies = await fetchMovies(query);
          setMovies(fetchedMovies);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
      getMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.search.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <div>
      <Navigation />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>Please enter the movie title.</p>
      )}
    </div>
  );
};

export default MoviesPage;
