# WeatherVue - Proyecto Académico Nuxt 4

Aplicación web meteorológica de alta fidelidad desarrollada con **Nuxt 4**, **Vue 3**, **TypeScript** y **Composition API**, que permite consultar el clima actual de cualquier ciudad utilizando la API de OpenWeatherMap.

---

## 🚀 Tecnologías Utilizadas

- **Framework**: Nuxt 4 (Compatibility Version: 4)
- **Librería UI**: Vue 3
- **Lenguaje**: TypeScript (Strict Mode)
- **Estilos**: CSS Puro (Custom Properties, Flexbox, Grid, Glassmorphic Glass-morphism)
- **API**: OpenWeatherMap API (Current Weather Data 2.5)

---

## 📋 Características Implementadas (Funcionalidades Obligatorias)

1. **Buscador de Ciudad**: Campo de entrada con soporte para búsquedas interactivas mediante botón de buscar, tecla `Enter` y selección de sugerencias rápidas.
2. **Visualización de Métricas del Clima**:
   - Temperatura y Sensación Térmica
   - Descripción meteorológica detallada en español
   - Humedad relativa (%)
   - Velocidad del viento (m/s) y dirección cardinal animada (🧭, ↗️, ➡️, ↘️, etc.)
   - Icono oficial renderizado en alta definición
   - Horarios de Amanecer y Atardecer calculados según la hora local de la ciudad
3. **Historial de las Últimas 5 Búsquedas**: Historial de búsqueda dinámico que almacena hasta 5 consultas consecutivas sin duplicados (case-insensitive), persistido de forma segura en `localStorage` y con opción de eliminar entradas de forma individual (`×`) o limpiar todo.
4. **Estado de Carga (Loading State)**: Spinner y barra de progreso de alta gama basados en animaciones CSS (radar pulsante y barras con efecto shimmer) para retroalimentar la carga de datos.
5. **Manejo de Errores Amigables**: Control inteligente de errores de red, ciudad no encontrada (404), API Key desconfigurada (401/500) y reintentos automáticos.
6. **Persistencia**: Sincronización transparente con `localStorage` en el cliente.
7. **Diseño Responsive**: Interfaz adaptiva (Mobile First) que funciona en móviles, tablets y computadoras de escritorio.

---

## 💡 Conceptos Clave de Nuxt 4 Utilizados

- **Nuxt 4 Directory Structure**: Utiliza la configuración y el estándar de carpetas de Nuxt 4 (con retrocompatibilidad mediante `compatibilityVersion: 4` en `future`).
- **Composition API & Auto-Imports**: Implementación limpia de reactividad con `ref`, `computed`, `onMounted`, `useState` y `useHead` sin necesidad de importar manualmente cada dependencia de Vue o Nuxt.
- **Composables**: Abstracción modular del estado global y la lógica de negocio con `useWeather` y `useSearchHistory`.
- **RuntimeConfig**: Acceso seguro a las claves privadas de servidor y variables públicas desde el cliente.
- **Server API Routes**: Endpoint local en `/api/weather` que actúa como Proxy seguro para esconder la API Key de OpenWeatherMap del cliente final.
- **SSR / CSR Hybrid Behavior**: Carga inicial del framework del lado del servidor (SSR) combinada con hidratación y almacenamiento persistente (localStorage) en el cliente (CSR) mediante banderas seguras `import.meta.client`.

---

## ⚖️ Ventajas y Desventajas de Nuxt 4

### Ventajas
1. **Seguridad Nativa**: El uso de Server Routes proxy (`server/api/`) oculta y protege la API Key en el servidor, evitando filtraciones en el frontend.
2. **Rendimiento de Carga (SSR)**: La página inicial se pre-renderiza en el servidor, agilizando el primer despliegue en pantalla (First Contentful Paint) y mejorando el SEO.
3. **Auto-Imports Eficientes**: Ahorra líneas de código repetitivo al importar automáticamente composables, componentes y helpers de Vue.
4. **Tipado Estricto de Extremo a Extremo**: Compatibilidad nativa con TypeScript y auto-generación de interfaces en la carpeta `.nuxt/`.

### Desventajas
1. **Acceso Limitado a Web APIs en SSR**: Elementos globales del cliente como `window`, `document` o `localStorage` no existen en la carga de servidor y deben ser condicionados bajo `import.meta.client` o ganchos `onMounted`.
2. **Complejidad Inicial**: Curva de aprendizaje superior a una SPA clásica debido a la gestión compartida de estado entre servidor y cliente.
3. **Mayor Consumo de Recursos en Servidor**: El pre-renderizado bajo demanda requiere un servidor de Node.js o una plataforma Serverless activa, a diferencia de una SPA estática ordinaria.

---

## 🛠️ Instalación y Configuración

1. **Clonar repositorio e instalar dependencias**:
   ```bash
   npm install
   ```

2. **Instrucciones para la API Key de OpenWeatherMap**:
   - Regístrate en [OpenWeatherMap](https://openweathermap.org/) y obtén tu API Key gratuita.
   - Crea un archivo llamado `.env` en la raíz del proyecto.
   - Agrega tu clave en el archivo con el siguiente formato:
     ```env
     NUXT_OPENWEATHER_API_KEY=tu_api_key_aqui
     OPENWEATHER_API_KEY=tu_api_key_aqui
     ```
   *(Nota: La API Key está protegida por la propiedad `runtimeConfig` en `nuxt.config.ts` y nunca llegará al navegador de los clientes).*

3. **Ejecución en Entorno Local (Desarrollo)**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la aplicación.

4. **Construcción y Compilación para Producción**:
   ```bash
   npm run build
   ```

---

## 📸 Capturas de Pantalla (Estados de la Aplicación)

### 1. Buscador Principal en su Estado Inicial (Vacío)
Muestra la interfaz inicial con fondo atmosférico estrellado y chips de sugerencias rápidas para Costa Rica y otras capitales globales.
![Buscador Vacío](public/screenshots/buscador_vacio.png)

### 2. Tarjeta de Clima - San José, Costa Rica
Renderizado de la tarjeta meteorológica con hora local calculada, badge nacional traducido, dirección del viento, amanecer/atardecer local y el banner dinámico de sugerencias.
![Clima de San José, Costa Rica](public/screenshots/clima_sanjose.png)

### 3. Estado de Carga (Loading Radar Spinner)
Spinner interactivo con círculos de radar pings en CSS puro y barra shimmer progresiva.
![Estado Cargando](public/screenshots/estado_cargando.png)

### 4. Mensaje de Error Amigable (Ciudad No Encontrada)
Mensaje de error personalizado en español con opción de reintento directo.
![Mensaje de Error](public/screenshots/error_ciudad.png)
