import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceFilters } from "@/components/resources/resource-filters";
import { ResourceSearch } from "@/components/resources/resource-search";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Resource Hub</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Access our collection of templates, guides, and articles to enhance your advocacy efforts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <aside className="md:block">
            <ResourceFilters />
          </aside>
          <main className="space-y-6">
            <ResourceSearch />
            <ResourceGrid />
          </main>
        </div>
      </div>
    </div>
  );
}