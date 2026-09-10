import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export const EmptyDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background">
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">Failed to load details.</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Go Back
        </Button>
      </main>
    </div>
  );
};
