import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/site-header";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Movie from "@/pages/movie";
import Profile from "@/pages/profile";
import Auth from "@/pages/auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movie/:id" component={Movie} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={Auth} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <Router />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
