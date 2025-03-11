const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZjZjFmYzY2MzhlZTJkZTI5NzRiOTYzYmYyNWQ1NSIsIm5iZiI6MTU5OTk2MDAxOC4zMTksInN1YiI6IjVmNWQ3M2QyNjg4Y2QwMDAzN2Y0Mjg1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ISZ2ilR5EF7x-TtuhYHXvppCrFRlQzaiN1P7kEWy4YI";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  'Authorization': `Bearer ${TMDB_API_KEY}`,
  'Content-Type': 'application/json'
};

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
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  const data = await response.json();
  return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/movie/popular`,
    { headers }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id: string): Promise<Movie> {
  const response = await fetch(
    `${BASE_URL}/movie/${id}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return await response.json();
}