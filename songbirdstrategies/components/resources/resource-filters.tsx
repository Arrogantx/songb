"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const resourceTypes = [
  { id: "templates", label: "Templates" },
  { id: "guides", label: "Guides" },
  { id: "articles", label: "Articles" },
];

const categories = [
  { id: "advocacy", label: "Advocacy" },
  { id: "communications", label: "Communications" },
  { id: "strategy", label: "Strategy" },
  { id: "research", label: "Research" },
];

export function ResourceFilters() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Resource Type</h3>
        <div className="space-y-2">
          {resourceTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox id={type.id} />
              <label
                htmlFor={type.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <label
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Button variant="outline" size="sm" className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}