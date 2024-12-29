import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-8">
      <div className="relative w-full max-w-md">
        <Card className="border-border bg-card">
          <CardHeader className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">Welcome back</div>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}