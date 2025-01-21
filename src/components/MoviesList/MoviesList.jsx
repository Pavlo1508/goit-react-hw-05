function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Release Date: {movie.release_date}</p>
          <p>Overview: {movie.overview}</p>
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
