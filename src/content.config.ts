import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const heroStyle = z.object({
  heroBackgroundColor: z.string().optional(),
  heroOverlayColor: z.string().optional(),
  heroOverlayOpacity: z.number().optional(),
  heroHeadingColor: z.string().optional(),
  heroIntroColor: z.string().optional(),
  heroAccentColor: z.string().optional(),
  heroHeadingFont: z.enum(['display','body','utility']).optional(),
}).optional();

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(), market: z.string(), location: z.string().optional(),
    featuredImage: z.string().optional(), gallery: z.array(z.string()).optional(),
    shortDescription: z.string(), gc: z.string().optional(), owner: z.string().optional(),
    projectSize: z.string().optional(), completionDate: z.string().optional(),
    services: z.array(z.string()).optional(), featured: z.boolean().default(false),
    sortOrder: z.number().default(0), heroStyle,
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(), shortDescription: z.string(), heroImage: z.string().optional(),
    icon: z.string().optional(), featured: z.boolean().default(false), sortOrder: z.number().default(0),
    heroStyle,
  }),
});

const markets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/markets' }),
  schema: z.object({
    title: z.string(), shortDescription: z.string(), cardImage: z.string().optional(),
    heroImage: z.string().optional(), icon: z.string().optional(), accentColor: z.string().optional(),
    featured: z.boolean().default(false), sortOrder: z.number().default(0), heroStyle,
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(), role: z.string(), headshot: z.string().optional(),
    email: z.string().email().optional(), phone: z.string().optional(), bio: z.string().optional(),
    displayOrder: z.number().default(0), publicProfile: z.boolean().default(true),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(), person: z.string().optional(), role: z.string().optional(),
    company: z.string().optional(), project: z.string().optional(),
    approvedPublic: z.boolean().default(false),
    showOn: z.array(z.enum(['home','about','services','markets','projects'])).default([]),
    sortOrder: z.number().default(0),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(), resourceType: z.string(), description: z.string(),
    file: z.string().optional(), externalUrl: z.string().optional(),
    visibility: z.enum(['public', 'request_required', 'private']).default('public'),
    icon: z.string().optional(), sortOrder: z.number().default(0),
  }),
});

const images = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/images' }),
  schema: z.object({
    title: z.string(), image: z.string(), alt: z.string().optional(),
    category: z.enum(['Hero','Project','Service','Market','Team','General']).default('General'),
    notes: z.string().optional(),
  }),
});

const positions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/positions' }),
  schema: z.object({
    title: z.string(), roleType: z.string(), employmentType: z.string().default('Full-Time'),
    location: z.string().optional(), description: z.string(),
    requirements: z.array(z.string()).optional(),
    active: z.boolean().default(true), sortOrder: z.number().default(0),
  }),
});

export const collections = { projects, services, markets, team, testimonials, resources, images, positions };
