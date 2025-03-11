import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { signOutUser } from "@/lib/firebase";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            MovieFlix
          </span>
        </Link>

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/browse">Browse</Link>
            <Link href="/watchlist">My List</Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies..."
                className="pl-8 w-[200px] md:w-[300px]"
              />
            </div>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <Avatar>
                    <AvatarFallback>
                      {currentUser.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="ghost" onClick={() => signOutUser()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}