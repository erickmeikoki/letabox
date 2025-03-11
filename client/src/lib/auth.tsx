import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        setCurrentUser(user);
        setLoading(false);
        if (user) {
          console.log("User is signed in:", user.email);
        }
      },
      (error) => {
        console.error("Auth state error:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem with authentication. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [toast]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}