import { useQuery, useMutation } from "@tanstack/react-query";
import { getMovieDetails } from "@/lib/tmdb";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { addToWatchlist } from "@/lib/firestore";
import { addReview } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { ReviewForm } from "@/components/ReviewForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MovieDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!)
  });

  const addToWatchlistMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser || !movie) return;
      await addToWatchlist({
        userId: currentUser.uid,
        movieId: movie.id.toString()
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Movie added to your watchlist",
      });
    },
    onError: (error) => {
      console.error("Error adding to watchlist:", error);
      toast({
        title: "Error",
        description: "Failed to add movie to watchlist",
        variant: "destructive",
      });
    },
  });

  const handleAddReview = async (rating: number, content: string) => {
    if (!currentUser || !movie) return;

    await addReview({
      userId: currentUser.uid,
      movieId: movie.id.toString(),
      rating,
      content,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleAddToWatchlist = () => {
    if (!currentUser) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add movies to your watchlist",
        variant: "destructive",
      });
      return;
    }
    addToWatchlistMutation.mutate();
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative container mx-auto py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full md:w-[300px]"
          />

          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>

            <p className="text-lg mb-6">{movie.overview}</p>

            <div className="flex gap-4">
              <Button 
                onClick={handleAddToWatchlist}
                disabled={addToWatchlistMutation.isPending}
              >
                <Plus className="w-4 h-4 mr-2" />
                {addToWatchlistMutation.isPending ? 'Adding...' : 'Add to Watchlist'}
              </Button>

              {currentUser ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Write a Review</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Review {movie.title}</DialogTitle>
                    </DialogHeader>
                    <ReviewForm movieId={movie.id.toString()} onSubmit={handleAddReview} />
                  </DialogContent>
                </Dialog>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Sign in required",
                      description: "Please sign in to review movies",
                      variant: "destructive",
                    });
                  }}
                >
                  Write a Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}