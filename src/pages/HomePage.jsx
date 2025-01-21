import { Link } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation"

const HomePage = ({ movies }) => {
	
	return (
    <div>
      <section>
        <Navigation />
      </section>
      <section>
        <h1>Trending today</h1>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id.toString()}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;