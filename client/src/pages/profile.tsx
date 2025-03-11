import { useQuery } from "@tanstack/react-query";
import { MovieGrid } from "@/components/movie/movie-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "wouter";

export default function Profile() {
  const [user] = useAuthState(auth);

  const { data: watchlist } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const res = await fetch("/api/watchlist");
      return res.json();
    },
  });

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-4xl font-bold">Profile</h1>
      <Tabs defaultValue="watchlist">
        <TabsList>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="watchlist" className="mt-6">
          {watchlist && <MovieGrid movies={watchlist} />}
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          {/* Reviews implementation */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
