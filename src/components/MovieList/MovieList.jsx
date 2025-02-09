import { Link, useLocation } from "react-router-dom";

function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id.toString()}>
          <Link
            to={`/movies/${movie.id}`}
            state={{
              from: location.pathname,
              query: location.search,
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
