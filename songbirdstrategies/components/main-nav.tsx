"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useSupabase } from "@/lib/supabase/provider";

export function MainNav() {
  const router = useRouter();
  const { session, supabase } = useSupabase();

  const handleAuthClick = async () => {
    if (session) {
      await supabase.auth.signOut();
      router.push('/');
    } else {
      router.push('/auth');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 glow-border rounded-lg p-2">
          <div className="bg-background/95 p-2 rounded-full">
            <Image 
              src="/logo.svg" 
              alt="Songbird Logo" 
              width={24} 
              height={24}
              className="h-6 w-6"
            />
          </div>
          <span className="text-xl font-bold bg-background/95 px-2 py-1 rounded glow-text">
            Songbird
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button 
            variant="default"
            size="sm"
            onClick={handleAuthClick}
            className="btn-primary"
          >
            <LogIn className="mr-2 h-4 w-4" />
            {session ? 'Sign Out' : 'Sign In'}
          </Button>
        </div>
      </div>
    </nav>
  );
}