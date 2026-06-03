# Weather App - Proyecto Académico Nuxt 4

Aplicación web desarrollada con Nuxt 4, Vue 3, TypeScript y Composition API, que permite consultar el clima actual de cualquier ciudad utilizando la API de OpenWeatherMap.

## 🚀 Tecnologías Utilizadas

- **Framework:** Nuxt 4 (compatibilityVersion: 4)
- **Librería UI:** Vue 3
- **Lenguaje:** TypeScript
- **Estilos:** CSS Puro (Grid, Flexbox, Variables CSS)
- **API:** OpenWeatherMap API (Current Weather Data 2.5)

## 📋 Funcionalidades

1. **Búsqueda de ciudad:** Mediante un campo de texto y botón.
2. **Información Climática:** Temperatura, sensación térmica, humedad, viento e icono oficial.
3. **Historial de Búsquedas:** Guarda las últimas 5 búsquedas usando `localStorage`.
4. **Estado de Carga:** Muestra un spinner puro en CSS durante las peticiones.
5. **Manejo de Errores:** Control de 404, 401 y 500 con mensajes amigables.
6. **Diseño Responsivo:** Patrón Mobile First adaptado a múltiples resoluciones y soporte a Modo Oscuro.

## 🛠️ Instalación y Configuración

1. **Clonar repositorio e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Variables de Entorno:**
   Crear un archivo `.env` en la raíz del proyecto (basado en el archivo generado automáticamente) e incluir tu API Key de OpenWeatherMap:
   ```env
   OPENWEATHER_API_KEY=tu_api_key_aqui
   ```

3. **Ejecución Local (Desarrollo):**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

4. **Construcción para Producción:**
   ```bash
   npm run build
   ```

## 🔐 Arquitectura y Seguridad
La comunicación con OpenWeatherMap se realiza de manera segura mediante una API intermedia (Server Route) en `/api/weather.get.ts`, evitando que la API Key se exponga al frontend.

## 🧪 Pruebas
El proyecto está configurado con Vitest para pruebas unitarias. Para correr las pruebas (debes añadir tus archivos de prueba):
```bash
npm run test
```
