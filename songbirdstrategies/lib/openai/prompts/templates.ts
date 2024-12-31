export const PROMPT_TEMPLATES = {
  social: {
    structure: [
      "Hook/Opening",
      "Main Message",
      "Call to Action",
      "Relevant Hashtags"
    ]
  },
  email: {
    structure: [
      "Subject Line",
      "Opening Greeting",
      "Main Content",
      "Call to Action",
      "Closing"
    ]
  },
  press: {
    structure: [
      "Headline",
      "Subheadline",
      "Lead Paragraph",
      "Key Points",
      "Supporting Quotes",
      "Call to Action",
      "Contact Information"
    ]
  },
  blog: {
    structure: [
      "Title",
      "Introduction",
      "Main Points",
      "Supporting Evidence",
      "Conclusion",
      "Call to Action"
    ]
  },
  default: {
    structure: [
      "Introduction",
      "Main Content",
      "Conclusion",
      "Call to Action"
    ]
  }
} as const;