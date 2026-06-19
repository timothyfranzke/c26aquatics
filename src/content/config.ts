import { defineCollection, z } from 'astro:content';

const coaches = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    headshot: z.string(),
    credentials: z.array(z.string()).default([]),
    usaSwimmingMember: z.boolean().default(false),
    safeSportCertified: z.boolean().default(false),
    order: z.number(),
  }),
});

// `slug` is intentionally omitted — Astro reserves that field and derives it
// from the filename. Downstream callers should use `entry.slug`.
const trainingGroups = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    ageRange: z.string(),
    schedule: z.string(),
    commitmentLevel: z.enum(['developmental', 'competitive', 'elite']),
    prerequisites: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const lessonTracks = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    ageRange: z.string(),
    format: z.enum(['group', 'semi-private', 'private']),
    description: z.string(),
    order: z.number(),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.enum(['team', 'lessons', 'logistics', 'general']),
    surfaces: z
      .array(z.enum(['home', 'team', 'swim-lessons', 'faq']))
      .min(1),
    order: z.number(),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = {
  coaches,
  'training-groups': trainingGroups,
  'lesson-tracks': lessonTracks,
  faqs,
  testimonials,
};
