"use strict";

export const PROMPT_TEMPLATES = {
  social: {
    base: `Create a compelling social media post that {goal} for {audience}. Use a {tone} tone that resonates with the target audience.`,
    examples: [
      "Join us in making a difference! 🌟 [Call to Action] #Advocacy #Impact",
      "Breaking: Important update on [Topic]. Here's what you need to know 🔍 #Policy"
    ]
  },
  email: {
    base: `Compose an email campaign that {goal} for {audience}. Maintain a {tone} tone throughout the message.`,
    structure: [
      "Subject Line",
      "Opening Hook",
      "Main Message",
      "Call to Action",
      "Closing"
    ]
  },
  press: {
    base: `Write a press release that {goal} targeting {audience}. Use a {tone} tone appropriate for media coverage.`,
    structure: [
      "Headline",
      "Dateline",
      "Lead Paragraph",
      "Body",
      "Boilerplate",
      "Contact Information"
    ]
  },
  blog: {
    base: `Create a blog post that {goal} for {audience}. Maintain a {tone} tone throughout the article.`,
    structure: [
      "Attention-Grabbing Title",
      "Introduction",
      "Main Points",
      "Supporting Evidence",
      "Conclusion",
      "Call to Action"
    ]
  }
} as const;