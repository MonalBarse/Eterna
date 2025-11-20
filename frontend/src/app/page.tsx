import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <Card className="p-6 space-y-4">
        <h1 className="text-xl font-semibold">shadcn/ui test</h1>
        <Button>Click me</Button>
      </Card>
    </main>
  );
}
