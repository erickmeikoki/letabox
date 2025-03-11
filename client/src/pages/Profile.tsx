import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/firebase";

export function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Please sign in</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
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
    </div>
  );
}