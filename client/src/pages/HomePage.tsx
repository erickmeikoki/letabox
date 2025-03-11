import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, searchMovies } from "@/lib/tmdb";
import { MovieGrid } from "@/components/MovieGrid";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => searchQuery ? searchMovies(searchQuery) : getPopularMovies()
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to MovieFlix</h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        {searchQuery ? "Search Results" : "Popular Movies"}
      </h2>
      {movies && <MovieGrid movies={movies} />}
    </div>
  );
}