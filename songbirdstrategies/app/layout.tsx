import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { SupabaseProvider } from "@/lib/supabase/provider";
import { Toaster } from "@/components/ui/toaster";
import { APP_CONFIG } from '@/lib/config';

// Load Inter font
const inter = Inter({ subsets: ['latin'] });

// Metadata
export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <div className="min-h-screen bg-background text-foreground">
              <MainNav />
              <main>{children}</main>
              <Toaster />
            </div>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}