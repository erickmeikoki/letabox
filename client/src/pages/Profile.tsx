import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/lib/firestore";
import { getMovieDetails } from "@/lib/tmdb";
import { Star } from "lucide-react";
import { Link } from "wouter";

export function Profile() {
  const { currentUser } = useAuth();

  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["userReviews", currentUser?.uid],
    queryFn: () => currentUser ? getUserReviews(currentUser.uid) : Promise.resolve([]),
    enabled: !!currentUser
  });

  const { data: reviewedMovies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["reviewedMovies", reviews],
    queryFn: async () => {
      if (!reviews) return [];
      const moviePromises = reviews.map(review => 
        getMovieDetails(review.movieId)
      );
      return Promise.all(moviePromises);
    },
    enabled: !!reviews?.length
  });

  if (!currentUser) {
    return <div>Please sign in</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="font-medium">Email</label>
              <p>{currentUser.email}</p>
            </div>

            <div>
              <label className="font-medium">Account Created</label>
              <p>{currentUser.metadata.creationTime}</p>
            </div>

            <Button
              variant="destructive"
              onClick={() => signOutUser()}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>My Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingReviews || isLoadingMovies ? (
            <p>Loading your reviews...</p>
          ) : reviews?.length && reviewedMovies ? (
            <div className="space-y-6">
              {reviews.map((review, index) => {
                const movie = reviewedMovies[index];
                if (!movie) return null;

                return (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <Link href={`/movie/${movie.id}`}>
                      <div className="flex items-start gap-4">
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="rounded-md w-16"
                        />
                        <div>
                          <h3 className="font-semibold hover:text-primary">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {review.content}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              You haven't reviewed any movies yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}