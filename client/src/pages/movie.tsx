import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { getMovieDetails } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Star, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Movie() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(Number(id)),
  });

  const addToWatchlist = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/watchlist", { movieId: Number(id) });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Added to watchlist",
      });
    },
  });

  if (isLoading || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="h-[50vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="container relative -mt-32 space-y-6">
        <div className="flex gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-lg shadow-xl"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <p className="text-lg text-muted-foreground">{movie.overview}</p>
            <Button
              onClick={() => addToWatchlist.mutate()}
              disabled={addToWatchlist.isPending}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
