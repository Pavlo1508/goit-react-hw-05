import { Suspense, lazy, useState, useEffect } from "react";
import { fetchTopRatedMovies } from "../services/api";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

const HomePage = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetails = lazy(() => import("../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function App() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const fetchedMovies = await fetchTopRatedMovies();
        setTopRatedMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    getTopRatedMovies();
  }, []);

  if (topRatedMovies.length === 0) {
    return <div>No top films</div>;
  }

  return (
    <div>
			<Suspense fallback={<div>Loading...</div>}>
				<Navigation />
        <Routes>
          <Route path="/" element={<HomePage movies={topRatedMovies} />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
