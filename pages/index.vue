<template>
  <div class="page-wrapper">
    <!-- ═══════════════════════ HEADER ═══════════════════════ -->
    <header class="hero">
      <!-- Badge -->
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span>Datos en tiempo real</span>
      </div>

      <!-- Title -->
      <h1 class="hero-title">
        <span class="gradient-text">WeatherVue</span>
      </h1>
      <p class="hero-subtitle">
        Consulta el clima de cualquier ciudad del mundo con precisión meteorológica
      </p>

      <!-- Animated weather icons row -->
      <div class="hero-icons" aria-hidden="true">
        <span class="h-icon h-icon--1">🌤</span>
        <span class="h-icon h-icon--2">🌧</span>
        <span class="h-icon h-icon--3">⛅</span>
        <span class="h-icon h-icon--4">❄️</span>
        <span class="h-icon h-icon--5">🌩</span>
      </div>
    </header>

    <!-- ═══════════════════════ MAIN ═══════════════════════ -->
    <main class="main-content" role="main">

      <!-- Search -->
      <section class="search-section">
        <SearchBar @search="handleSearch" />
      </section>

      <!-- States -->
      <section class="results-section">
        <Transition name="fade-up" mode="out-in">
          <LoadingSpinner v-if="loading" key="loading" />
          <ErrorMessage v-else-if="error" :message="error.message" key="error" />
          <WeatherCard v-else-if="weather" :weather="weather" key="card" />
          <div v-else class="empty-state" key="empty">
            <div class="empty-illustration">🌍</div>
            <h2 class="empty-title">¿Cómo está el clima hoy?</h2>
            <p class="empty-desc">Escribe el nombre de una ciudad para comenzar</p>
          </div>
        </Transition>
      </section>

      <!-- History -->
      <section class="history-section" v-if="history.length > 0">
        <SearchHistory
          :history="history"
          @select="handleSearch"
          @clear="clearHistory"
        />
      </section>

    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>Datos proporcionados por <a href="https://openweathermap.org" target="_blank" rel="noopener">OpenWeatherMap</a></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
const { history, saveSearch, clearHistory } = useSearchHistory();

const handleSearch = async (city: string) => {
  const success = await searchWeather(city);
  if (success) {
    saveSearch(city);
  }
};
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────── */
.page-wrapper {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 60px;
}

/* ── Hero ────────────────────────────────────────── */
.hero {
  width: 100%;
  max-width: 680px;
  text-align: center;
  padding: 72px 0 40px;
  animation: fadeInUp 0.6s var(--ease-out) both;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(91, 156, 246, 0.10);
  border: 1px solid rgba(91, 156, 246, 0.25);
  border-radius: var(--radius-full);
  padding: 6px 16px;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 24px;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-success);
  box-shadow: 0 0 8px var(--color-success);
  animation: pulse-ring 2s ease-out infinite;
  position: relative;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.05;
  margin-bottom: 18px;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  max-width: 480px;
  margin: 0 auto 32px;
  font-weight: 400;
}

/* Floating weather icon decorations */
.hero-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 8px;
  margin-bottom: -20px;
}

.h-icon {
  font-size: 1.6rem;
  opacity: 0.45;
  display: inline-block;
  animation: orbFloat 8s ease-in-out infinite alternate;
}
.h-icon--1 { animation-delay: 0s;    animation-duration: 7s; }
.h-icon--2 { animation-delay: -1.5s; animation-duration: 9s; }
.h-icon--3 { animation-delay: -3s;   animation-duration: 6s; }
.h-icon--4 { animation-delay: -4.5s; animation-duration: 10s; }
.h-icon--5 { animation-delay: -2s;   animation-duration: 8s; }

/* ── Main Content ────────────────────────────────── */
.main-content {
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Search section ──────────────────────────────── */
.search-section {
  animation: fadeInUp 0.6s var(--ease-out) 0.1s both;
}

/* ── Results section ─────────────────────────────── */
.results-section {
  min-height: 80px;
}

/* ── Empty state ─────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 20px;
  gap: 12px;
  animation: fadeIn 0.4s ease;
}

.empty-illustration {
  font-size: 4rem;
  line-height: 1;
  filter: grayscale(0.3);
  animation: orbFloat 6s ease-in-out infinite alternate;
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin-top: 8px;
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  max-width: 280px;
}

/* ── Footer ──────────────────────────────────────── */
.app-footer {
  margin-top: auto;
  padding-top: 48px;
  font-size: 0.78rem;
  color: var(--color-text-subtle);
  text-align: center;
}

.app-footer a {
  color: var(--color-primary);
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.app-footer a:hover {
  opacity: 1;
}

/* ── Vue Transitions ─────────────────────────────── */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all var(--duration-slow) var(--ease-out);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
