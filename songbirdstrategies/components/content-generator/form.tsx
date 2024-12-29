"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { OptInDialog } from "@/components/marketing/opt-in-dialog";

const formSchema = z.object({
  audience: z.string({
    required_error: "Please select your target audience.",
  }),
  goal: z.string({
    required_error: "Please select your content goal.",
  }),
  tone: z.string({
    required_error: "Please select your desired tone.",
  }),
  contentType: z.string({
    required_error: "Please select the type of content.",
  }),
  additionalContext: z.string().optional(),
});

export type GeneratorFormData = z.infer<typeof formSchema>;

interface ContentGeneratorFormProps {
  onGenerate: (data: GeneratorFormData) => void;
  isGenerating?: boolean;
}

export function ContentGeneratorForm({ onGenerate, isGenerating }: ContentGeneratorFormProps) {
  const [showOptIn, setShowOptIn] = useState(false);
  const form = useForm<GeneratorFormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: GeneratorFormData) {
    onGenerate(values);
    setShowOptIn(true);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select your target audience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="grassroots">Grassroots Advocates</SelectItem>
                    <SelectItem value="policymakers">Policymakers</SelectItem>
                    <SelectItem value="businesses">Small Businesses</SelectItem>
                    <SelectItem value="general">General Public</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Goal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select your content goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mobilize">Mobilize Action</SelectItem>
                    <SelectItem value="inform">Inform & Educate</SelectItem>
                    <SelectItem value="persuade">Persuade & Convince</SelectItem>
                    <SelectItem value="inspire">Inspire & Motivate</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Tone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select your content tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="urgent">Urgent & Compelling</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="social">Social Media Post</SelectItem>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="press">Press Release</SelectItem>
                    <SelectItem value="blog">Blog Post</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalContext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Context</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any specific details or requirements for your content..."
                    className="bg-background resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Provide any additional context or specific requirements.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Content'
            )}
          </Button>
        </form>
      </Form>

      {showOptIn && (
        <OptInDialog onClose={() => setShowOptIn(false)} />
      )}
    </>
  );
}