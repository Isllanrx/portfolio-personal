import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://isllan.dev'
  const lastModified = new Date()

  // The root path '/' serves 'pt' content. 
  // We use alternates to link the language versions.
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          'pt-BR': baseUrl,
          'en-US': `${baseUrl}/en`,
          'es-ES': `${baseUrl}/es`,
        },
      },
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
    }
  ]
}
