<template>
  <article class="weather-card" :style="({ '--card-accent': accentColor } as Record<string, string>)" v-if="weather">

    <!-- Glowing background accent -->
    <div class="card-glow" aria-hidden="true"></div>

    <!-- ── TOP: Location + Icon ──────────────── -->
    <header class="card-header">
      <div class="location-info">
        <!-- Pin icon -->
        <div class="location-pin">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
        </div>

        <div class="location-text">
          <h2 class="city-name">{{ weather.name }}</h2>
          <span class="country-date">
            <span class="country-badge">{{ weather.sys.country }}</span>
            <span class="sep">·</span>
            <span class="date-str">{{ formattedDate }}</span>
          </span>
        </div>
      </div>

      <!-- Weather icon from OWM -->
      <div class="icon-wrap">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
          :alt="weather.weather[0].description"
          class="weather-icon"
        />
        <span class="condition-badge">{{ weather.weather[0].description }}</span>
      </div>
    </header>

    <!-- ── DIVIDER ────────────────────────────── -->
    <div class="card-divider"></div>

    <!-- ── TEMPERATURE ────────────────────────── -->
    <section class="temp-section">
      <div class="temp-display">
        <span class="temp-value">{{ Math.round(weather.main.temp) }}</span>
        <span class="temp-unit">°C</span>
      </div>
      <div class="temp-meta">
        <div class="feels-like">
          <span class="meta-label">Sensación</span>
          <span class="meta-value">{{ Math.round(weather.main.feels_like) }}°C</span>
        </div>
        <div class="temp-range" v-if="weather.main.temp_min != null && weather.main.temp_max != null">
          <span class="range-item range-low">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="range-icon">
              <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd"/>
            </svg>
            {{ Math.round(weather.main.temp_min!) }}°
          </span>
          <span class="range-item range-high">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="range-icon">
              <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd"/>
            </svg>
            {{ Math.round(weather.main.temp_max!) }}°
          </span>
        </div>
      </div>
    </section>

    <!-- ── DETAILS GRID ───────────────────────── -->
    <section class="details-grid">

      <div class="detail-card">
        <div class="detail-icon humidity-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.6.3l6.975 9.298a7.5 7.5 0 11-15.15 0L11.4 2.55a.75.75 0 01.6-.3z"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Humedad</span>
          <span class="detail-value">{{ weather.main.humidity }}<small>%</small></span>
        </div>
        <div class="detail-bar">
          <div class="detail-bar-fill" :style="{ width: weather.main.humidity + '%' }"></div>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-icon wind-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2"/>
            <path d="M9.6 4.6A2 2 0 1111 8H2"/>
            <path d="M12.6 19.4A2 2 0 1014 16H2"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Viento</span>
          <span class="detail-value">{{ weather.wind.speed }}<small>m/s</small></span>
        </div>
        <div class="detail-bar">
          <div class="detail-bar-fill" :style="{ width: Math.min(weather.wind.speed * 5, 100) + '%' }"></div>
        </div>
      </div>

      <div class="detail-card" v-if="weather.main.pressure">
        <div class="detail-icon pressure-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="12" x2="15" y2="15"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Presión</span>
          <span class="detail-value">{{ weather.main.pressure }}<small>hPa</small></span>
        </div>
      </div>

      <div class="detail-card" v-if="weather.visibility != null">
        <div class="detail-icon visibility-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Visibilidad</span>
          <span class="detail-value">{{ (weather.visibility! / 1000).toFixed(1) }}<small>km</small></span>
        </div>
      </div>

    </section>

  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WeatherResponse } from '~/types/weather';

const props = defineProps<{
  weather: WeatherResponse;
}>();

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());
});

// Dynamic accent color based on weather condition
const accentColor = computed(() => {
  const icon = props.weather?.weather?.[0]?.icon ?? '';
  if (icon.includes('01') || icon.includes('02')) return '#f59e0b'; // sunny/clear
  if (icon.includes('09') || icon.includes('10') || icon.includes('11')) return '#60a5fa'; // rain/storm
  if (icon.includes('13')) return '#93c5fd'; // snow
  if (icon.includes('50')) return '#94a3b8'; // mist
  return '#5b9cf6'; // default blue
});
</script>

<style scoped>
/* ── Card Shell ────────────────────────────── */
.weather-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-xl);
  padding: 32px;
  overflow: hidden;
  animation: scaleIn 0.45s var(--ease-out) both;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.45),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
}

/* Colored top-border accent */
.weather-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--card-accent, var(--color-primary)), var(--color-accent));
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

/* ── Glow orb behind the card ──────────────── */
.card-glow {
  position: absolute;
  top: -60px;
  right: -40px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, var(--card-accent, var(--color-primary)), transparent 65%);
  opacity: 0.08;
  pointer-events: none;
  border-radius: 50%;
}

/* ── Header ────────────────────────────────── */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.location-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.location-pin {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(var(--card-accent, 91, 156, 246), 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--card-accent, var(--color-primary));
}

.location-pin svg {
  width: 18px;
  height: 18px;
}

.location-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.city-name {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.country-date {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.country-badge {
  display: inline-block;
  padding: 2px 10px;
  background: rgba(91, 156, 246, 0.12);
  border: 1px solid rgba(91, 156, 246, 0.20);
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-primary);
}

.sep {
  color: var(--color-text-subtle);
}

.date-str {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  text-transform: capitalize;
}

/* ── Weather icon ──────────────────────────── */
.icon-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
}

.weather-icon {
  width: 110px;
  height: 110px;
  object-fit: contain;
  filter: drop-shadow(0 4px 20px rgba(91, 156, 246, 0.3));
  margin-top: -18px;
  margin-bottom: -8px;
  animation: orbFloat 5s ease-in-out infinite alternate;
}

.condition-badge {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  color: var(--color-text-muted);
  background: rgba(255, 255, 255, 0.06);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* ── Divider ───────────────────────────────── */
.card-divider {
  margin: 24px 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}

/* ── Temperature ───────────────────────────── */
.temp-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
}

.temp-display {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  line-height: 1;
}

.temp-value {
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 6rem);
  font-weight: 800;
  letter-spacing: -4px;
  background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.temp-unit {
  font-size: 2rem;
  font-weight: 300;
  color: var(--color-text-muted);
  margin-top: 10px;
}

.temp-meta {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-end;
}

.feels-like {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.meta-label {
  font-size: 0.70rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--color-text-subtle);
}

.meta-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.temp-range {
  display: flex;
  gap: 12px;
}

.range-item {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.85rem;
  font-weight: 500;
}

.range-icon {
  width: 13px;
  height: 13px;
}

.range-low  { color: #60a5fa; }
.range-high { color: #f59e0b; }

/* ── Details Grid ──────────────────────────── */
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.detail-card {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background var(--duration-base) ease,
              border-color var(--duration-base) ease,
              transform var(--duration-base) ease;
  overflow: hidden;
}

.detail-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.13);
  transform: translateY(-2px);
}

.detail-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-icon svg {
  width: 18px;
  height: 18px;
}

.humidity-icon    { background: rgba(96,165,250,0.12);  color: #60a5fa; }
.wind-icon        { background: rgba(167,139,250,0.12); color: #a78bfa; }
.pressure-icon    { background: rgba(251,191,36,0.12);  color: #fbbf24; }
.visibility-icon  { background: rgba(52,211,153,0.12);  color: #34d399; }

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.70rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--color-text-subtle);
}

.detail-value {
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.5px;
}

.detail-value small {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 2px;
}

/* Mini progress bar */
.detail-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.detail-bar-fill {
  height: 100%;
  background: var(--gradient-brand);
  border-radius: var(--radius-full);
  transition: width 0.8s var(--ease-out);
}

/* ── Responsive ────────────────────────────── */
@media (max-width: 520px) {
  .weather-card {
    padding: 22px 18px;
  }

  .card-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .location-info {
    flex-direction: column;
    align-items: center;
  }

  .location-text {
    align-items: center;
  }

  .temp-section {
    flex-direction: column;
    align-items: center;
  }

  .temp-meta {
    align-items: center;
  }

  .details-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
