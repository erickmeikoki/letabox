import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { getUserWatchlist, removeFromWatchlist } from "@/lib/firestore";
import { getMovieDetails } from "@/lib/tmdb";
import { MovieGrid } from "@/components/MovieGrid";
import { useToast } from "@/hooks/use-toast";

export function WatchList() {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const { data: watchlistItems, isLoading: isLoadingWatchlist } = useQuery({
    queryKey: ["watchlist", currentUser?.uid],
    queryFn: () => currentUser ? getUserWatchlist(currentUser.uid) : Promise.resolve([]),
    enabled: !!currentUser
  });

  const { data: movies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["watchlist-movies", watchlistItems],
    queryFn: async () => {
      if (!watchlistItems) return [];
      const moviePromises = watchlistItems.map(item => 
        getMovieDetails(item.movieId)
      );
      return Promise.all(moviePromises);
    },
    enabled: !!watchlistItems
  });

  const removeFromWatchlistMutation = useMutation({
    mutationFn: async (movieId: string) => {
      if (!currentUser) return;
      await removeFromWatchlist(currentUser.uid, movieId);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Movie removed from watchlist",
      });
    },
    onError: (error) => {
      console.error("Error removing from watchlist:", error);
      toast({
        title: "Error",
        description: "Failed to remove movie from watchlist",
        variant: "destructive",
      });
    },
  });

  if (!currentUser) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your watchlist</h1>
      </div>
    );
  }

  if (isLoadingWatchlist || isLoadingMovies) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Loading your watchlist...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      {movies && movies.length > 0 ? (
        <MovieGrid 
          movies={movies} 
          onAddToWatchlist={(movieId) => removeFromWatchlistMutation.mutate(movieId)}
        />
      ) : (
        <p className="text-center text-muted-foreground">
          Your watchlist is empty. Browse movies and add them to your watchlist!
        </p>
      )}
    </div>
  );
}
