import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase";
import { useLocation } from "wouter";

export function Login() {
  const [, setLocation] = useLocation();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      setLocation("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to MovieFlix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Sign in to start exploring movies
          </p>
          <Button
            className="w-full"
            size="lg"
            onClick={handleLogin}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
