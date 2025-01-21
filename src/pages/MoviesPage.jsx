import MoviesList from "../components/MoviesList/MoviesList";
import Navigation from "../components/Navigation/Navigation";

const MoviesPage = ({movies}) => {
	console.log(movies);
	
  return (
    <div>
      <Navigation />
      <MoviesList movies={movies} />
    </div>
  );
};

export default MoviesPage;
