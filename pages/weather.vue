<template>
  <div class="page-wrapper">

    <!-- Hero / Title -->
    <header class="weather-hero">
      <div class="brand-mark" aria-hidden="true">
        <span class="brand-icon">🌐</span>
      </div>
      <h1 class="weather-title">Consultar Clima</h1>
      <p class="weather-subtitle">
        Consulta el clima de cualquier ciudad del mundo con <em>precisión meteorológica</em> en tiempo real.
      </p>
    </header>

    <!-- Main application area -->
    <main class="main-content" role="main">

      <!-- Search -->
      <section class="search-section" aria-label="Búsqueda de ciudad">
        <SearchBar @search="handleSearch" />
      </section>

      <!-- States -->
      <section class="results-section" aria-live="polite">
        <Transition name="fade-up" mode="out-in">
          <LoadingSpinner v-if="loading" key="loading" />
          <ErrorMessage v-else-if="error" :message="error.message" @retry="handleRetry" key="error" />
          <WeatherCard v-else-if="weather" :weather="weather" key="card" />
          <div v-else class="empty-state" key="empty">
            <div class="empty-globe" aria-hidden="true">
              <span class="globe-emoji">🌍</span>
              <div class="globe-ring globe-ring--1"></div>
              <div class="globe-ring globe-ring--2"></div>
            </div>
            <h2 class="empty-title">¿Cómo está el clima hoy?</h2>
            <p class="empty-desc">Escribe el nombre de una ciudad para comenzar tu consulta</p>
            <div class="empty-suggestions" aria-label="Sugerencias">
              <span class="suggest-label">Prueba con:</span>
              <button
                v-for="city in suggestedCities"
                :key="city.name"
                class="suggest-chip"
                @click="handleSearch(city.name)"
                type="button"
              >{{ city.display }}</button>
            </div>
          </div>
        </Transition>
      </section>

      <!-- History -->
      <section
        class="history-section"
        v-if="history.length > 0"
        aria-label="Historial de búsquedas"
      >
        <SearchHistory
          :history="history"
          @select="handleSearch"
          @remove="handleRemoveSearch"
          @clear="clearHistory"
        />
      </section>

    </main>

    <!-- Page Footer -->
    <FooterSection />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWeather } from '~/composables/useWeather';
import { useSearchHistory } from '~/composables/useSearchHistory';

useHead({
  title: 'WeatherVue — Consulta de Clima',
  meta: [
    { name: 'description', content: 'Consulta el clima de tus ciudades favoritas de forma dinámica con WeatherVue.' }
  ]
});

const { weather, loading, error, searchWeather } = useWeather();
const { history, saveSearch, removeSearch, clearHistory } = useSearchHistory();

const suggestedCities = [
  { name: 'San José, CR', display: 'San José 🇨🇷' },
  { name: 'Madrid, ES', display: 'Madrid 🇪🇸' },
  { name: 'Tokyo, JP', display: 'Tokio 🇯🇵' },
  { name: 'New York, US', display: 'Nueva York 🇺🇸' },
  { name: 'Paris, FR', display: 'París 🇫🇷' }
];

const lastQuery = ref<string>('');

const handleSearch = async (city: string) => {
  let query = city.trim();
  // Normalizar búsqueda si el usuario ingresa San José solo,
  // de modo que siempre use San José, Costa Rica (CR) como destino principal.
  const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (normalized === 'san jose') {
    query = 'San José, CR';
  }
  lastQuery.value = query;
  const success = await searchWeather(query);
  if (success && weather.value) {
    saveSearch(`${weather.value.name}, ${weather.value.sys.country}`);
  }
};

const handleRemoveSearch = (city: string) => {
  removeSearch(city);
};

const handleRetry = () => {
  if (lastQuery.value) {
    handleSearch(lastQuery.value);
  }
};

const DEFAULT_CITY = 'San José, CR';

onMounted(() => {
  // Carga ciudad por defecto si no hay clima previo
  if (!weather.value) {
    handleSearch(DEFAULT_CITY);
  }
});
</script>

<style scoped>
.page-wrapper {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 80px;
}

.weather-hero {
  width: 100%;
  max-width: 700px;
  text-align: center;
  margin-bottom: 24px;
  animation: fadeInUp 0.7s var(--ease-out) both;
}

.brand-mark {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.brand-icon {
  font-size: 2.5rem;
  animation: floatY 4s ease-in-out infinite;
  filter: drop-shadow(0 8px 24px rgba(99,102,241,0.45));
  display: inline-block;
}

.weather-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.weather-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto;
}

.weather-subtitle em {
  font-style: normal;
  color: var(--color-cyan);
  font-weight: 500;
}

.main-content {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 48px;
}

.search-section {
  animation: fadeInUp 0.7s var(--ease-out) 0.12s both;
}

.results-section {
  min-height: 90px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 52px 20px 40px;
  gap: 14px;
  animation: fadeIn 0.5s ease;
}

.empty-globe {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.globe-emoji {
  font-size: 3.6rem;
  position: relative;
  z-index: 1;
  animation: floatY 5s ease-in-out infinite;
}

.globe-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(99,102,241,0.35);
  animation: radarPing 3s ease-out infinite;
}

.globe-ring--2 {
  animation-delay: 1.5s;
  border-color: rgba(34,211,238,0.25);
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.empty-desc {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  max-width: 300px;
  line-height: 1.6;
}

.empty-suggestions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;
}

.suggest-label {
  font-size: 0.78rem;
  color: var(--color-text-subtle);
  font-weight: 500;
  margin-right: 4px;
}

.suggest-chip {
  background: rgba(99,102,241,0.09);
  border: 1px solid rgba(99,102,241,0.22);
  border-radius: var(--radius-full);
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 0.80rem;
  font-weight: 500;
  padding: 5px 14px;
  cursor: pointer;
  transition: background var(--duration-fast), border-color var(--duration-fast), transform var(--duration-base) var(--ease-smooth);
}

.suggest-chip:hover {
  background: rgba(99,102,241,0.18);
  border-color: rgba(99,102,241,0.45);
  transform: translateY(-2px) scale(1.04);
}

/* Transitions */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all var(--duration-slow) var(--ease-out);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(22px) scale(0.97);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
</style>
