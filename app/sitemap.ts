import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://isllan.dev'
  const lastModified = new Date('2025-01-01')

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt`,
          'en-US': `${baseUrl}/en`,
          'es-ES': `${baseUrl}/es`,
          'x-default': `${baseUrl}/pt`,
        },
      },
    },
    {
      url: `${baseUrl}/pt`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pt/certifications`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/certifications`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/es/certifications`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
}
