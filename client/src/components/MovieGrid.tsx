import { Movie } from "@/lib/tmdb";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onAddToWatchlist?: (movieId: string) => void;
}

export function MovieGrid({ movies, onAddToWatchlist }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToWatchlist={() => onAddToWatchlist?.(movie.id.toString())}
        />
      ))}
    </div>
  );
}
