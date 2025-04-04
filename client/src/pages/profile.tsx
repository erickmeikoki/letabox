import { useQuery } from "@tanstack/react-query";
import { MovieGrid } from "@/components/MovieGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "wouter";
import { getUserWatchlist, getUserReviews } from "@/lib/firestore";
import { getMovieDetails } from "@/lib/tmdb";
import type { Movie } from "@/lib/tmdb";

interface FirestoreDoc {
	id: string;
	userId: string;
	movieId: string;
	addedAt?: Date;
	rating?: number;
	content?: string;
	createdAt?: Date;
}

export default function Profile() {
	const [user] = useAuthState(auth);
	const [, navigate] = useLocation();

	const { data: watchlistItems, isLoading: isLoadingWatchlist } = useQuery({
		queryKey: ["watchlist", user?.uid],
		queryFn: async () => {
			if (!user) return [];
			const items = await getUserWatchlist(user.uid);
			return items as FirestoreDoc[];
		},
		enabled: !!user
	});

	const { data: watchlistMovies, isLoading: isLoadingWatchlistMovies } =
		useQuery<Movie[]>({
			queryKey: ["watchlist-movies", watchlistItems],
			queryFn: async () => {
				if (!watchlistItems?.length) return [];
				const moviePromises = watchlistItems.map((item) =>
					getMovieDetails(item.movieId)
				);
				return Promise.all(moviePromises);
			},
			enabled: !!watchlistItems?.length
		});

	const { data: reviews, isLoading: isLoadingReviews } = useQuery({
		queryKey: ["user-reviews", user?.uid],
		queryFn: async () => {
			if (!user) return [];
			const items = await getUserReviews(user.uid);
			return items as FirestoreDoc[];
		},
		enabled: !!user
	});

	const { data: reviewMovies, isLoading: isLoadingReviewMovies } = useQuery<
		Movie[]
	>({
		queryKey: ["review-movies", reviews],
		queryFn: async () => {
			if (!reviews?.length) return [];
			const moviePromises = reviews.map((review) =>
				getMovieDetails(review.movieId)
			);
			return Promise.all(moviePromises);
		},
		enabled: !!reviews?.length
	});

	if (!user) {
		navigate("/auth");
		return null;
	}

	if (
		isLoadingWatchlist ||
		isLoadingWatchlistMovies ||
		isLoadingReviews ||
		isLoadingReviewMovies
	) {
		return (
			<div className="container py-6">
				<h1 className="text-4xl font-bold">Profile</h1>
				<div className="mt-6">Loading...</div>
			</div>
		);
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
					{watchlistMovies && watchlistMovies.length > 0 ? (
						<MovieGrid movies={watchlistMovies} />
					) : (
						<p className="text-center text-muted-foreground">
							Your watchlist is empty. Browse movies and add them to your
							watchlist!
						</p>
					)}
				</TabsContent>
				<TabsContent value="reviews" className="mt-6">
					{reviews && reviewMovies && reviews.length > 0 ? (
						<div className="space-y-4">
							{reviews.map((review, index) => {
								const movie = reviewMovies[index];
								return (
									<div key={review.id} className="border rounded-lg p-4">
										<div className="flex items-center gap-2 mb-2">
											<h3 className="font-semibold">{movie?.title}</h3>
											<div className="flex items-center">
												<span className="text-yellow-400">★</span>
												<span className="ml-1">{review.rating}</span>
											</div>
										</div>
										<p className="text-muted-foreground">{review.content}</p>
									</div>
								);
							})}
						</div>
					) : (
						<p className="text-center text-muted-foreground">
							You haven't written any reviews yet. Start reviewing movies you've
							watched!
						</p>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
