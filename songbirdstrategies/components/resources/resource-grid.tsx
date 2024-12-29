"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BookOpen, FileSpreadsheet } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Advocacy Campaign Template",
    description: "A comprehensive template for planning and executing successful advocacy campaigns.",
    type: "template",
    category: "advocacy",
    icon: FileSpreadsheet,
  },
  {
    id: 2,
    title: "Social Media Strategy Guide",
    description: "Learn how to create an effective social media strategy for your advocacy efforts.",
    type: "guide",
    category: "communications",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Press Release Template",
    description: "Professional template for creating compelling press releases.",
    type: "template",
    category: "communications",
    icon: FileText,
  },
  // Add more resources as needed
];

export function ResourceGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}

function ResourceCard({ resource }: { resource: typeof resources[0] }) {
  const Icon = resource.icon;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground capitalize">{resource.type}</span>
        </div>
        <h3 className="font-semibold mt-2">{resource.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{resource.description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}