"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './client';
import { useRouter, usePathname } from 'next/navigation';

interface SupabaseContext {
  supabase: SupabaseClient;
  session: Session | null;
  isLoading: boolean;
}

const Context = createContext<SupabaseContext | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // Handle auth state changes
      if (session) {
        if (pathname === '/auth') {
          router.push('/dashboard');
        }
      } else {
        if (pathname.startsWith('/dashboard')) {
          router.push('/auth');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  return (
    <Context.Provider value={{ supabase, session, isLoading }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
};