// nuxt.config.ts – configuración básica para Nuxt 4
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    openweatherApiKey: '', // Se sobreescribirá dinámicamente con NUXT_OPENWEATHER_API_KEY en .env
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap'
        }
      ]
    }
  }
})

