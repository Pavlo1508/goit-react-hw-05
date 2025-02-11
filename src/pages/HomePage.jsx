import { useState, useEffect } from "react";
import { fetchTopRatedMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const fetchedMovies = await fetchTopRatedMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <section>
        <h1>Trending today</h1>
        <MovieList movies={movies} />
      </section>
    </div>
  );
};

export default HomePage;
