import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchMovieReviews(movieId);
      setReviews(fetchedReviews);
    };
    getReviews();
  }, [movieId]);

  if (!reviews.length) {
    return <p>No reviews available.</p>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>
              <strong>{review.author}</strong>: {review.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
