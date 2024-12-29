"use client";

import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/lib/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSearchParams } from "next/navigation";

export function AuthForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectedFrom');
  const callbackUrl = `${window.location.origin}/auth/callback${redirectTo ? `?redirectedFrom=${redirectTo}` : ''}`;

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'hsl(var(--primary))',
                brandAccent: 'hsl(var(--primary))',
                brandButtonText: 'hsl(var(--primary-foreground))',
              },
            },
          },
          style: {
            button: {
              borderRadius: '6px',
              height: '40px',
              fontSize: '14px',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
            },
            input: {
              borderRadius: '6px',
              height: '40px',
              fontSize: '14px',
              backgroundColor: 'transparent',
              borderColor: 'hsl(var(--border))',
            },
            label: {
              fontSize: '14px',
              marginBottom: '4px',
              color: 'hsl(var(--foreground))',
            },
            anchor: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
            },
          },
          className: {
            button: "bg-primary text-primary-foreground hover:bg-primary/90",
            input: "bg-background border-input",
            label: "text-foreground",
            anchor: "text-primary hover:text-primary/90",
          },
        }}
        providers={["google", "github"]}
        redirectTo={callbackUrl}
        theme="dark"
      />
    </div>
  );
}