import { useQuery } from "@tanstack/react-query";
import { MovieGrid } from "@/components/movie/movie-grid";

export function Browse() {
	const { data: movies } = useQuery({
		queryKey: ["movies"],
		queryFn: async () => {
			const res = await fetch("/api/movies");
			return res.json();
		}
	});

	return (
		<div className="container py-6 space-y-6">
			<h1 className="text-4xl font-bold">Browse Movies</h1>
			{movies && <MovieGrid movies={movies} />}
		</div>
	);
}
