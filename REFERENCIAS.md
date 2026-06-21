# Referencias y Fuentes Bibliográficas

A continuación se detallan las fuentes oficiales, guías técnicas y especificaciones consultadas y aplicadas para el desarrollo, seguridad y optimización de **WeatherVue**. Este listado cumple con las normativas académicas de citación y fundamentación tecnológica.

---

### 1. Documentación Oficial de Nuxt - Introducción, Ciclo de Vida y Configuración
* **Origen**: Oficial (Framework Core)
* **Enlace**: [https://nuxt.com/docs/getting-started/introduction](https://nuxt.com/docs/getting-started/introduction)
* **Descripción Detallada**:
  Esta documentación constituyó el pilar estructural del proyecto. Se consultó para comprender el comportamiento híbrido de Nuxt (Server-Side Rendering e hidratación posterior en el cliente) y aplicar el estándar de Nuxt 4 (haciendo uso de la clave `compatibilityVersion: 4` bajo el nodo `future` en `nuxt.config.ts`). Adicionalmente, proveyó el sustento metodológico para la arquitectura de directorios automáticos (como `pages/`, `components/` y `composables/`) que eliminan la necesidad de importar manualmente componentes y lógica reactiva.

### 2. Guía Oficial de Vue.js - Reactividad y Composition API
* **Origen**: Oficial (Library Core)
* **Enlace**: [https://vuejs.org/guide/essentials/reactivity-fundamentals.html](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
* **Descripción Detallada**:
  Documento clave para estructurar la lógica basada en Composition API en Nuxt 4. Se utilizaron las guías de fundamentos de reactividad para la implementación limpia de variables de estado reactivo mediante `ref()`, variables calculadas automáticas con `computed()` (como el formateador de fechas y el banner contextual) y el ciclo de vida del componente mediante `onMounted()`. La guía permitió establecer flujos de datos síncronos y asíncronos desacoplados del DOM, garantizando un renderizado ultra-rápido y predecible.

### 3. OpenWeatherMap API - Especificación Técnica de Current Weather Data
* **Origen**: Oficial (API Provider)
* **Enlace**: [https://openweathermap.org/current](https://openweathermap.org/current)
* **Descripción Detallada**:
  Documento técnico de integración. Describe las estructuras de respuesta HTTP JSON, los parámetros de consulta admitidos (como `q` para localización, `units` para unidades métricas, `lang` para idioma y `appid` para autorización), y las restricciones de tasa de peticiones. Fue crucial para diseñar las interfaces de TypeScript en `types/weather.ts` y mapear con exactitud campos complejos como `sys.sunrise`, `sys.sunset`, `timezone` y la estructura interna del arreglo `weather[0]`.

### 4. TypeScript Handbook - Interfaces y Tipado Estricto (Strict Mode)
* **Origen**: Oficial (Language Specifications)
* **Enlace**: [https://www.typescriptlang.org/docs/handbook/interfaces.html](https://www.typescriptlang.org/docs/handbook/interfaces.html)
* **Descripción Detallada**:
  Manual utilizado para establecer un entorno de desarrollo tipado y seguro. El manual de interfaces orientó la declaración estructurada del contrato de datos meteorológicos. Al mapear explícitamente las respuestas JSON de OpenWeatherMap, se mitigaron los errores de propiedades inexistentes en tiempo de compilación y se aseguró que el editor autocompletara las propiedades de manera óptima. Resolvió la seguridad del tipo `WeatherResponse` utilizado a través de los componentes.

### 5. MDN Web Docs - API de Almacenamiento Web (localStorage)
* **Origen**: Comunidad / Estándar de la Web
* **Enlace**: [https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* **Descripción Detallada**:
  Recurso técnico para la persistencia de datos en el lado del cliente. MDN detalla la especificación de almacenamiento clave-valor, límites de tamaño, almacenamiento como cadenas de texto y el manejo de excepciones. En este proyecto se utilizó para el almacenamiento persistente de las últimas 5 búsquedas, integrándose con `JSON.stringify` y `JSON.parse` para serializar arreglos complejos. Además, sirvió para entender las restricciones de acceso en entornos con SSR, condicionando su llamada mediante `import.meta.client`.

### 6. MDN Web Docs - Propiedades Personalizadas CSS (Variables CSS)
* **Origen**: Comunidad / Estándar de la Web
* **Enlace**: [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
* **Descripción Detallada**:
  Guía consultada para implementar un sistema de diseño modular y dinámico sin depender de frameworks pesados de CSS. Se utilizó para definir los tokens globales del tema (colores principales, desenfoques glassmorphic, duraciones de animación y tipografías) a nivel de `:root` y permitir su alteración en tiempo de ejecución. Esto facilitó que las tarjetas cambiaran de color de acento y gradiente de forma fluida dependiendo del tipo de clima retornado (soleado, lluvioso, nevado, nublado).

### 7. Vitest - Framework de Pruebas Unitarias Nativo para Vite
* **Origen**: Técnico / Herramienta de Testing
* **Enlace**: [https://vitest.dev/guide/](https://vitest.dev/guide/)
* **Descripción Detallada**:
  Guía de configuración de pruebas unitarias. Detalla cómo configurar el runner de tests nativo de Vite, estructurar las suites de prueba (`describe`, `test`), y realizar aserciones de valores (`expect`). Su consulta permitió sentar las bases en `package.json` (`"test": "vitest"`) y preparar el entorno para la posterior validación automatizada de los composables y flujos de negocio clave en aislamiento.

### 8. Vue Test Utils - Guía de Pruebas de Componentes
* **Origen**: Oficial (Ecosistema Vue)
* **Enlace**: [https://test-utils.vuejs.org/guide/](https://test-utils.vuejs.org/guide/)
* **Descripción Detallada**:
  Documento técnico utilizado para configurar y entender las pruebas de integración en componentes gráficos. Explica cómo realizar el montaje virtual (`mount`), inyectar props, capturar y simular eventos del usuario (como clics en chips o inputs del buscador) y verificar que los componentes emitan los eventos esperados (como `@select` y `@remove` en `SearchHistory.vue`).
