import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { HomePage } from "@/pages/HomePage";
import { MovieDetails } from "@/pages/MovieDetails";
import Profile from "@/pages/profile";
import { Login } from "@/pages/Login";
import { WatchList } from "@/pages/WatchList";
import { Browse } from "@/pages/Browse";
import NotFound from "@/pages/not-found";

function Router() {
	return (
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/movie/:id" component={MovieDetails} />
			<Route path="/profile" component={Profile} />
			<Route path="/login" component={Login} />
			<Route path="/watchlist" component={WatchList} />
			<Route path="/browse" component={Browse} />
			<Route component={NotFound} />
		</Switch>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<div className="min-h-screen bg-background">
					<Navbar />
					<main>
						<Router />
					</main>
				</div>
				<Toaster />
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
