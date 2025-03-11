import { Movie } from "@/lib/tmdb";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist?: () => void;
}

export function MovieCard({ movie, onAddToWatchlist }: MovieCardProps) {
  const { toast } = useToast();

  const handleAddToWatchlist = () => {
    onAddToWatchlist?.();
    toast({
      title: "Added to Watchlist",
      description: `${movie.title} has been added to your watchlist`,
    });
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:scale-105">
      <Link href={`/movie/${movie.id}`}>
        <CardContent className="p-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="aspect-[2/3] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
        onClick={handleAddToWatchlist}
      >
        <Heart className="w-5 h-5" />
      </Button>
    </Card>
  );
}
