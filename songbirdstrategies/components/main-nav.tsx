"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
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
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Replace SongbirdLogo with an image */}
          <img 
            src="/logo.svg" 
            alt="Songbird Logo" 
            className="h-8 w-auto" // Adjust height and width as needed
          />
          <span className="text-xl font-bold">Songbird</span>
        </Link>
        
        {/* Rest of the navigation code remains the same */}
        
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <Button 
            variant="default"
            size="sm"
            onClick={handleAuthClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {session ? (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
