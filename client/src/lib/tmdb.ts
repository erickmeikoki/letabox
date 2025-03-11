const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  const data = await response.json();
  return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id: string): Promise<Movie> {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return await response.json();
}
