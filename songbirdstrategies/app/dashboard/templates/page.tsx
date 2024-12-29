"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

const templates = [
  {
    id: 1,
    title: "Social Media Campaign",
    description: "Template for planning and executing social media campaigns",
    format: "PDF",
  },
  {
    id: 2,
    title: "Press Release",
    description: "Professional press release template with guidelines",
    format: "DOCX",
  },
  {
    id: 3,
    title: "Email Newsletter",
    description: "Newsletter template with content blocks and styling",
    format: "HTML",
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const { session } = useSupabase();

  useEffect(() => {
    if (!session) {
      router.replace('/auth');
    }
  }, [session, router]);

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Templates</h1>
        </div>

        <div className="grid gap-6">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{template.description}</p>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download {template.format}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}