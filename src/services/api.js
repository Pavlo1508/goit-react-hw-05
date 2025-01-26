import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWI0ZGM5ZmRmNWEzMzdhYWU2ZjA1MTY4NjM0NTc5YSIsIm5iZiI6MTczNzQyMTM4MC43MTcsInN1YiI6IjY3OGVmMjQ0ZTFhZjIwNTkwZmFhYTQ2OCIsInNjb3BlcyI6WyJhcGlfcmVhZF0sInZlcnNpb24iOjF9.Gk1rBYl11ocRU-IUoBjIk1L_iNdkGu7fg_73ygCAj6k";

const API_KEY = "45b4dc9fdf5a337aae6f05168634579a";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query) => {
  try {
    const url = "/search/movie";
    const { data } = await axios.get(url, {
      params: {
        api_key: API_KEY,
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    return [];
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return [];
  }
};

