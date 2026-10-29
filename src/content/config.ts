import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // YYYY-MM-DD
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // optional hero image, e.g. "/blog/my-post/cover.png"
    cover: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    // true = hidden from the site (keeps the file)
    draft: z.boolean().default(false),
    // short highlight chip, e.g. "1st place · InnoTrans 2026"
    badge: z.string().optional(),
    // thumbnail shown beside the project on the homepage, e.g. "/projects/foo.png"
    image: z.string().optional(),
    // wide hero image on the project's own page; defaults to `image`
    cover: z.string().optional(),
    // lower = earlier in the list
    order: z.number().default(100),
  }),
});

export const collections = { blog, projects };
