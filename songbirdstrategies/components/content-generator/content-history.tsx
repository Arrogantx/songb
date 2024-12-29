"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContentHistory() {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Generation History</CardTitle>
        <CardDescription>
          View and manage your previously generated content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Sign in to view your generation history.
        </p>
      </CardContent>
    </Card>
  );
}