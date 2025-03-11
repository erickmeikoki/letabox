import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import type { Movie } from "@/lib/tmdb";
import { Link } from "wouter";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-transform hover:scale-105">
        <div className="relative aspect-[2/3]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {movie.vote_average.toFixed(1)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(movie.release_date).getFullYear()}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
