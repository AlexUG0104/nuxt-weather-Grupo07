import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const city = query.q as string;
  const config = useRuntimeConfig(event);

  if (!city) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El nombre de la ciudad es requerido',
    });
  }

  const apiKey = config.openweatherApiKey;

  if (!apiKey || apiKey === 'tu_api_key_aqui') {
    throw createError({
      statusCode: 500,
      statusMessage: 'La API Key de OpenWeatherMap no está configurada.',
    });
  }

  try {
    const data = await $fetch(`https://api.openweathermap.org/data/2.5/weather`, {
      query: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'es'
      }
    });
    
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Ciudad no encontrada. Por favor, verifica el nombre e intenta de nuevo.',
      });
    }
    
    if (error.response?.status === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Error de autenticación. Verifica la API Key.',
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error al comunicarse con el servidor del clima. Inténtalo más tarde.',
    });
  }
});
