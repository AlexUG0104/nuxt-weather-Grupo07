<template>
  <div class="page-wrapper">

    <!-- ═══════════════════════ HEADER / HERO ═══════════════════════ -->
    <header class="hero">

      <!-- Live badge -->
      <div class="hero-badge">
        <span class="badge-pulse">
          <span class="badge-dot"></span>
          <span class="badge-ring"></span>
        </span>
        <span>Datos en tiempo real</span>
      </div>

      <!-- Brand mark -->
      <div class="brand-mark" aria-hidden="true">
        <span class="brand-icon">🌐</span>
      </div>

      <!-- Title -->
      <h1 class="hero-title">
        <span class="gradient-text">WeatherVue</span>
      </h1>
      <p class="hero-subtitle">
        Consulta el clima de cualquier ciudad del mundo<br>
        con <em>precisión meteorológica</em> en tiempo real
      </p>

      <!-- Quick-facts strip -->
      <div class="hero-stats" aria-label="Características">
        <div class="stat-item">
          <span class="stat-icon">🛰️</span>
          <span class="stat-text">200k+ ciudades</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat-item">
          <span class="stat-icon">⚡</span>
          <span class="stat-text">Actualización 10 min</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat-item">
          <span class="stat-icon">🌍</span>
          <span class="stat-text">Cobertura global</span>
        </div>
      </div>

      <!-- Decorative floating weather icons -->
      <div class="hero-icons" aria-hidden="true">
        <span class="h-icon h-icon--1">☀️</span>
        <span class="h-icon h-icon--2">🌧️</span>
        <span class="h-icon h-icon--3">⛅</span>
        <span class="h-icon h-icon--4">❄️</span>
        <span class="h-icon h-icon--5">🌩️</span>
        <span class="h-icon h-icon--6">🌈</span>
      </div>
    </header>

    <!-- ═══════════════════════ MAIN ═══════════════════════ -->
    <main class="main-content" role="main">

      <!-- Search -->
      <section class="search-section" aria-label="Búsqueda de ciudad">
        <SearchBar @search="handleSearch" />
      </section>

      <!-- States -->
      <section class="results-section" aria-live="polite">
        <Transition name="fade-up" mode="out-in">
          <LoadingSpinner v-if="loading"    key="loading" />
          <ErrorMessage v-else-if="error" :message="error.message" @retry="handleRetry" key="error" />
          <WeatherCard   v-else-if="weather" :weather="weather" key="card" />
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

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-inner">
        <span class="footer-brand">WeatherVue</span>
        <span class="footer-sep">·</span>
        <span>Datos por <a href="https://openweathermap.org" target="_blank" rel="noopener">OpenWeatherMap</a></span>
        <span class="footer-sep">·</span>
        <span class="footer-time">{{ currentTime }}</span>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useWeather } from '~/composables/useWeather';
import { useSearchHistory } from '~/composables/useSearchHistory';

useHead({
  title: 'WeatherVue — Clima en tiempo real',
  meta: [
    { name: 'description', content: 'Consulta el clima en tiempo real de cualquier ciudad del mundo con WeatherVue.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
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

// Variable para recordar la última búsqueda
const lastQuery = ref<string>('');

const handleSearch = async (city: string) => {
  let query = city.trim();
  // Normalizar búsqueda si el usuario ingresa San José solo,
  // de modo que siempre use San José, Costa Rica (CR) como destino principal.
  const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (normalized === 'san jose') {
    query = 'San José, CR';
  }
  lastQuery.value = query; // Guardamos el intento
  const success = await searchWeather(query);
  if (success && weather.value) {
    saveSearch(`${weather.value.name}, ${weather.value.sys.country}`);
  }
};

const handleRemoveSearch = (city: string) => {
  removeSearch(city);
};

// NUEVO: Función para reintentar
const handleRetry = () => {
  if (lastQuery.value) {
    handleSearch(lastQuery.value);
  }
};

/* Live clock */
const currentTime = ref('');
let clockInterval: ReturnType<typeof setInterval>;

const updateClock = () => {
  currentTime.value = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short'
  }).format(new Date());
};

const DEFAULT_CITY = 'San José, CR';

onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);

  // Carga ciudad por defecto si no hay clima previo
  if (!weather.value) {
    handleSearch(DEFAULT_CITY);
  }
});

onUnmounted(() => clearInterval(clockInterval));
</script>
<style scoped>
/* ── Layout ─────────────────────────────────────────── */
.page-wrapper {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 80px;
}

/* ── Hero ────────────────────────────────────────────── */
.hero {
  width: 100%;
  max-width: 700px;
  text-align: center;
  padding: 80px 0 48px;
  animation: fadeInUp 0.7s var(--ease-out) both;
}

/* ── Live badge ─────────────────────────────────────── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(99, 102, 241, 0.10);
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: var(--radius-full);
  padding: 7px 18px;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 28px;
  backdrop-filter: blur(12px);
}

.badge-pulse {
  position: relative;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}

.badge-dot {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--color-success);
  animation: pulse-glow 2.5s ease-in-out infinite;
}

.badge-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 1.5px solid var(--color-success);
  animation: radarPing 2.5s ease-out infinite;
}

/* ── Brand globe ────────────────────────────────────── */
.brand-mark {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.brand-icon {
  font-size: 3.2rem;
  animation: floatY 4s ease-in-out infinite;
  filter: drop-shadow(0 8px 24px rgba(99,102,241,0.45));
  display: inline-block;
}

/* ── Title ──────────────────────────────────────────── */
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.02;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.08rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 460px;
  margin: 0 auto 32px;
  font-weight: 400;
}

.hero-subtitle em {
  font-style: normal;
  color: var(--color-cyan);
  font-weight: 500;
}

/* ── Stats strip ────────────────────────────────────── */
.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-full);
  padding: 10px 20px;
  margin-bottom: 36px;
  backdrop-filter: blur(16px);
  gap: 4px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
}

.stat-icon {
  font-size: 0.95rem;
}

.stat-text {
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: 16px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
}

/* ── Floating weather icons ─────────────────────────── */
.hero-icons {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: -24px;
}

.h-icon {
  font-size: 1.5rem;
  opacity: 0.40;
  display: inline-block;
}

.h-icon--1 { animation: floatY 6s ease-in-out infinite;            }
.h-icon--2 { animation: floatY 8s ease-in-out infinite; animation-delay: -1.5s; }
.h-icon--3 { animation: floatY 7s ease-in-out infinite; animation-delay: -3s;   }
.h-icon--4 { animation: floatY 9s ease-in-out infinite; animation-delay: -4s;   }
.h-icon--5 { animation: floatY 6.5s ease-in-out infinite; animation-delay: -2s; }
.h-icon--6 { animation: floatY 10s ease-in-out infinite; animation-delay: -5s;  }

/* ── Main Content ────────────────────────────────────── */
.main-content {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ── Search section ──────────────────────────────────── */
.search-section {
  animation: fadeInUp 0.7s var(--ease-out) 0.12s both;
}

/* ── Results section ─────────────────────────────────── */
.results-section {
  min-height: 90px;
}

/* ── Empty state ─────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 52px 20px 40px;
  gap: 14px;
  animation: fadeIn 0.5s ease;
}

/* Globe with radar rings */
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

/* Quick-suggest chips */
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

/* ── Footer ──────────────────────────────────────────── */
.app-footer {
  margin-top: auto;
  padding-top: 56px;
  width: 100%;
  max-width: 700px;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.76rem;
  color: var(--color-text-subtle);
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius-lg);
  padding: 12px 22px;
  backdrop-filter: blur(12px);
}

.footer-brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.82rem;
  background: var(--gradient-brand);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientFlow 5s ease infinite;
}

.footer-sep {
  color: rgba(255,255,255,0.15);
}

.app-footer a {
  color: var(--color-cyan);
  text-decoration: none;
  transition: opacity 0.2s;
}

.app-footer a:hover {
  opacity: 0.8;
}

.footer-time {
  font-family: 'Space Grotesk', monospace;
  font-weight: 500;
  font-size: 0.74rem;
  color: rgba(238,242,255,0.28);
  letter-spacing: 0.5px;
}

/* ── Vue Transitions ─────────────────────────────────── */
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

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 520px) {
  .hero-stats {
    flex-direction: column;
    gap: 8px;
    border-radius: var(--radius-lg);
    padding: 14px 18px;
  }
  .stat-divider { width: 40px; height: 1px; }
  .stat-item { padding: 0; }
  .hero-title { letter-spacing: -2px; }
}
</style>
