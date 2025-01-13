import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { SupabaseProvider } from "@/lib/supabase/provider";
import { Toaster } from "@/components/ui/toaster";
import { APP_CONFIG } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

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
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <MainNav />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}