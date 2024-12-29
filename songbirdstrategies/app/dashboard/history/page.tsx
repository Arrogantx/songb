"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ContentGeneration {
  id: string;
  created_at: string;
  audience: string;
  goal: string;
  tone: string;
  content_type: string;
  generated_content: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const { session, supabase } = useSupabase();
  const [generations, setGenerations] = useState<ContentGeneration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.replace('/auth');
      return;
    }

    async function fetchGenerations() {
      const { data, error } = await supabase
        .from('content_generations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching generations:', error);
        return;
      }

      setGenerations(data || []);
      setLoading(false);
    }

    fetchGenerations();
  }, [session, supabase, router]);

  const copyToClipboard = async (content: string) => {
    await navigator.clipboard.writeText(content);
  };

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Content History</h1>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : generations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No content generations yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {generations.map((gen) => (
              <Card key={gen.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="capitalize">{gen.content_type}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(gen.created_at), 'PPp')}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="capitalize">{gen.audience}</span> • {gen.goal} • {gen.tone} tone
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md relative group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(gen.generated_content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <p className="whitespace-pre-wrap">{gen.generated_content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}