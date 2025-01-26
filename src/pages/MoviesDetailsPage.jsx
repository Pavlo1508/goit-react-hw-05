import { lazy, useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/api";
import {
  Link,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const MovieDetails = () => {
	const { movieId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedMovie = await fetchMovieDetails(movieId);
      setMovie(fetchedMovie);
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <NotFoundPage />;
	}
	
	const handleGoBack = () => {
    if (location.state?.from === "/movies") {
      navigate("/movies", {
        state: {
          query: location.state.query,
          movies: location.state.movies,
        },
      });
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Navigation />
      <button onClick={handleGoBack}>Go back</button>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <h3>Release Date</h3>
          <p>{movie.release_date}</p>
          <h3>Rating</h3>
          <p>{movie.vote_average}</p>
        </div>
      </div>
      <div>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
