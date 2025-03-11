import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { MovieGrid } from "@/components/movie/movie-grid";
import { getPopularMovies, searchMovies } from "@/lib/tmdb";
import { useDebounce } from "@/hooks/use-debounce";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", debouncedSearch],
    queryFn: () =>
      debouncedSearch ? searchMovies(debouncedSearch) : getPopularMovies(),
  });

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Discover Movies</h1>
        <Input
          type="search"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <MovieGrid movies={movies || []} />
      )}
    </div>
  );
}
