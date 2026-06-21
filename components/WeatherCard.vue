<template>
  <article
    class="weather-card"
    :class="`theme-${weatherTheme}`"
    :style="({ '--card-accent': accentColor, '--card-accent-2': accentColor2 } as Record<string, string>)"
    v-if="weather"
  >
    <!-- Animated aurora blob inside card -->
    <div class="card-aurora" aria-hidden="true"></div>

    <!-- Top gradient bar -->
    <div class="card-topbar" aria-hidden="true"></div>

    <!-- ── HEADER: Location + Icon ──────────────── -->
    <header class="card-header">
      <div class="location-info">
        <!-- Pin badge -->
        <div class="location-pin">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
        </div>

        <div class="location-text">
          <h2 class="city-name">{{ weather.name }}</h2>
          <div class="city-meta">
            <span class="country-badge" :title="getCountryName(weather.sys.country)">
              {{ getFlagEmoji(weather.sys.country) }} {{ getCountryName(weather.sys.country) }}
            </span>
            <span class="meta-sep">·</span>
            <time class="date-str" :datetime="new Date().toISOString()">{{ formattedDate }}</time>
          </div>
        </div>
      </div>

      <!-- Weather icon + condition -->
      <div class="icon-wrap">
        <div class="icon-glow" aria-hidden="true"></div>
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon || ''}@4x.png`"
          :alt="weather.weather?.[0]?.description || ''"
          class="weather-icon"
          loading="lazy"
        />
        <span class="condition-badge">{{ weather.weather?.[0]?.description || '' }}</span>
      </div>
    </header>

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
          <span class="range-item range-low" :title="`Mínima: ${Math.round(weather.main.temp_min!)}°C`">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="range-icon">
              <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd"/>
            </svg>
            {{ Math.round(weather.main.temp_min!) }}°
          </span>
          <span class="range-item range-high" :title="`Máxima: ${Math.round(weather.main.temp_max!)}°C`">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="range-icon">
              <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd"/>
            </svg>
            {{ Math.round(weather.main.temp_max!) }}°
          </span>
        </div>
      </div>
    </section>

    <!-- ── WAVE DIVIDER ───────────────────────── -->
    <div class="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 600 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,10 C100,0 200,20 300,10 C400,0 500,20 600,10 L600,20 L0,20 Z" fill="rgba(255,255,255,0.03)"/>
      </svg>
    </div>

    <!-- ── DETAILS GRID ───────────────────────── -->
    <section class="details-grid">

      <div class="detail-card" style="--detail-color: #60a5fa; --detail-color-alpha: rgba(96,165,250,0.12);">
        <div class="detail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.6.3l6.975 9.298a7.5 7.5 0 11-15.15 0L11.4 2.55a.75.75 0 01.6-.3z"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Humedad</span>
          <span class="detail-value">{{ weather.main.humidity }}<small>%</small></span>
        </div>
        <div class="detail-bar-wrap">
          <div class="detail-bar">
            <div class="detail-bar-fill" :style="{ width: weather.main.humidity + '%' }"></div>
          </div>
          <span class="detail-bar-pct">{{ weather.main.humidity }}%</span>
        </div>
      </div>

      <div class="detail-card" style="--detail-color: #a78bfa; --detail-color-alpha: rgba(167,139,250,0.12);">
        <div class="detail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2"/>
            <path d="M9.6 4.6A2 2 0 1111 8H2"/>
            <path d="M12.6 19.4A2 2 0 1114 16H2"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Viento</span>
          <span class="detail-value">{{ weather.wind.speed }}<small>m/s</small></span>
        </div>
        <div class="detail-bar-wrap">
          <div class="detail-bar">
            <div class="detail-bar-fill" :style="{ width: Math.min(weather.wind.speed * 5, 100) + '%' }"></div>
          </div>
          <span class="detail-bar-pct">{{ getWindDirection(weather.wind.deg ?? 0) }}</span>
        </div>
      </div>

      <div class="detail-card" v-if="weather.main.pressure" style="--detail-color: #fbbf24; --detail-color-alpha: rgba(251,191,36,0.12);">
        <div class="detail-icon">
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
        <div class="detail-bar-wrap">
          <div class="detail-bar">
            <div class="detail-bar-fill" :style="{ width: Math.min((weather.main.pressure - 950) / 1.5, 100) + '%' }"></div>
          </div>
          <span class="detail-bar-pct">{{ weather.main.pressure }} hPa</span>
        </div>
      </div>

      <div class="detail-card" v-if="weather.visibility != null" style="--detail-color: #10b981; --detail-color-alpha: rgba(16,185,129,0.12);">
        <div class="detail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Visibilidad</span>
          <span class="detail-value">{{ (weather.visibility! / 1000).toFixed(1) }}<small>km</small></span>
        </div>
        <div class="detail-bar-wrap">
          <div class="detail-bar">
            <div class="detail-bar-fill" :style="{ width: Math.min((weather.visibility! / 10000) * 100, 100) + '%' }"></div>
          </div>
          <span class="detail-bar-pct">{{ (weather.visibility! / 1000).toFixed(1) }} km</span>
        </div>
      </div>

      <!-- Sunrise Card -->
      <div class="detail-card" v-if="sunriseTime" style="--detail-color: #fb7185; --detail-color-alpha: rgba(251,113,133,0.12);">
        <div class="detail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 22H6"/>
            <path d="m12 18-4-4h8z"/>
            <path d="M12 2v8"/>
            <path d="m5.22 10.22 1.42 1.42"/>
            <path d="m17.36 11.64 1.42-1.42"/>
            <path d="M22 22H2"/>
            <path d="M16 22a4 4 0 0 0-8 0"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Amanecer</span>
          <span class="detail-value">{{ sunriseTime }}</span>
        </div>
        <div class="detail-bar-wrap">
          <span class="detail-bar-pct">Salida del sol</span>
        </div>
      </div>

      <!-- Sunset Card -->
      <div class="detail-card" v-if="sunsetTime" style="--detail-color: #f59e0b; --detail-color-alpha: rgba(245,158,11,0.12);">
        <div class="detail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 22H6"/>
            <path d="M16 22a4 4 0 0 0-8 0"/>
            <path d="M12 2v8"/>
            <path d="m16 6-4 4-4-4"/>
            <path d="M22 22H2"/>
          </svg>
        </div>
        <div class="detail-info">
          <span class="detail-label">Atardecer</span>
          <span class="detail-value">{{ sunsetTime }}</span>
        </div>
        <div class="detail-bar-wrap">
          <span class="detail-bar-pct">Puesta del sol</span>
        </div>
      </div>

    </section>

    <!-- ── RECOMMENDATION BANNER ──────────────── -->
    <footer class="recommendation-banner" v-if="weatherRecommendation">
      <div class="rec-icon">💡</div>
      <div class="rec-content">
        <span class="rec-title">Sugerencia WeatherVue</span>
        <p class="rec-text">{{ weatherRecommendation }}</p>
      </div>
    </footer>

  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WeatherResponse } from '~/types/weather';

const props = defineProps<{
  weather: WeatherResponse;
}>();

const formattedDate = computed(() => {
  if (!props.weather) return '';
  // Calcular hora local del destino según el timezone offset retornado por OpenWeather
  const utc = Date.now() + (new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(utc + ((props.weather.timezone ?? 0) * 1000));
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(localTime);
});

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '';
  }
};

const getCountryName = (countryCode: string) => {
  if (!countryCode) return '';
  try {
    const regionNames = new Intl.DisplayNames(['es'], { type: 'region' });
    return regionNames.of(countryCode) || countryCode;
  } catch (e) {
    return countryCode;
  }
};

const getWindDirection = (deg: number) => {
  if (deg == null) return '';
  const directions = ['Norte 🧭', 'Nordeste ↗️', 'Este ➡️', 'Sudeste ↘️', 'Sur 🧭', 'Suroeste ↙️', 'Oeste ⬅️', 'Noroeste ↖️'];
  const idx = Math.round(((deg % 360) / 45)) % 8;
  return directions[idx];
};

const formatUnixTime = (unixSeconds: number, timezoneOffset: number) => {
  const utc = (unixSeconds * 1000) + (new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (timezoneOffset * 1000));
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(localTime);
};

const sunriseTime = computed(() => {
  if (!props.weather?.sys?.sunrise) return '';
  return formatUnixTime(props.weather.sys.sunrise, props.weather.timezone ?? 0);
});

const sunsetTime = computed(() => {
  if (!props.weather?.sys?.sunset) return '';
  return formatUnixTime(props.weather.sys.sunset, props.weather.timezone ?? 0);
});

const weatherRecommendation = computed(() => {
  if (!props.weather) return '';
  const temp = props.weather.main.temp;
  const icon = props.weather.weather?.[0]?.icon ?? '';
  const description = props.weather.weather?.[0]?.description?.toLowerCase() ?? '';

  if (icon.includes('11')) return 'Tormenta eléctrica en curso. Mantente bajo techo y evita aparatos eléctricos. ⚡';
  if (icon.includes('09') || icon.includes('10') || description.includes('lluvia') || description.includes('llovizna')) {
    return 'Se pronostica lluvia. No olvides tu paraguas o impermeable. 🌧️☔';
  }
  if (icon.includes('13') || description.includes('nieve')) return 'Nieve y bajas temperaturas. Vístete en capas y ten precaución al caminar. ❄️🧣';
  if (temp >= 30) return 'Calor intenso. Usa protector solar, mantente hidratado y evita la exposición directa al sol. ☀️🥤';
  if (temp <= 12) return 'Clima frío. Usa ropa abrigada y protege tu garganta. ❄️🧥';
  if (description.includes('niebla') || description.includes('neblina') || icon.includes('50')) {
    return 'Visibilidad reducida por niebla. Conduce con precaución y usa luces bajas. 🌫️🚗';
  }
  if (icon.includes('01')) return 'Cielo despejado. ¡Un día excelente para actividades al aire libre! ☀️😎';
  return 'Condiciones climáticas estables. ¡Disfruta tu día! 🍀';
});

// Dynamic accent based on weather condition
const accentColor = computed(() => {
  const icon = props.weather?.weather?.[0]?.icon ?? '';
  if (icon.includes('01') || icon.includes('02')) return '#fbbf24'; // sunny
  if (icon.includes('09') || icon.includes('10') || icon.includes('11')) return '#60a5fa'; // rain/storm
  if (icon.includes('13')) return '#93c5fd'; // snow
  if (icon.includes('50')) return '#94a3b8'; // mist
  return '#6366f1'; // default
});

const accentColor2 = computed(() => {
  const icon = props.weather?.weather?.[0]?.icon ?? '';
  if (icon.includes('01') || icon.includes('02')) return '#fb7185'; // warm
  if (icon.includes('09') || icon.includes('10') || icon.includes('11')) return '#a78bfa'; // cool
  if (icon.includes('13')) return '#e0f2fe'; // icy
  if (icon.includes('50')) return '#64748b'; // foggy
  return '#22d3ee';
});

const weatherTheme = computed(() => {
  const icon = props.weather?.weather?.[0]?.icon ?? '';
  if (icon.includes('01') || icon.includes('02')) return 'sunny';
  if (icon.includes('09') || icon.includes('10') || icon.includes('11')) return 'rainy';
  if (icon.includes('13')) return 'snowy';
  if (icon.includes('50')) return 'misty';
  return 'default';
});
</script>

<style scoped>
/* ── Card Shell ───────────────────────────────── */
.weather-card {
  position: relative;
  background: rgba(255, 255, 255, 0.044);
  backdrop-filter: blur(36px) saturate(220%);
  -webkit-backdrop-filter: blur(36px) saturate(220%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-top-color: rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-xl);
  padding: 36px 32px 28px;
  overflow: hidden;
  animation: scaleIn 0.5s var(--ease-out) both;
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255,255,255,0.05) inset,
    0 1px 0 rgba(255,255,255,0.12) inset;
  transition: transform var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base), border-color var(--duration-base);
}

.weather-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow:
    0 38px 90px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255,255,255,0.08) inset,
    0 1px 0 rgba(255,255,255,0.18) inset;
}

/* ── Top bar ──────────────────────────────────── */
.card-topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--card-accent), var(--card-accent-2), var(--card-accent));
  background-size: 200% 100%;
  animation: gradientFlow 4s ease infinite;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

/* ── Aurora inside the card ───────────────────── */
.card-aurora {
  position: absolute;
  top: -80px;
  right: -60px;
  width: 340px;
  height: 340px;
  background: radial-gradient(ellipse at 50% 50%, var(--card-accent), transparent 65%);
  opacity: 0.07;
  border-radius: 50%;
  pointer-events: none;
  animation: orbFloat 12s ease-in-out infinite alternate;
}

/* Theme-specific aurora tint */
.theme-sunny  .card-aurora { background: radial-gradient(ellipse, #fbbf24, transparent 65%); }
.theme-rainy  .card-aurora { background: radial-gradient(ellipse, #60a5fa, transparent 65%); }
.theme-snowy  .card-aurora { background: radial-gradient(ellipse, #bae6fd, transparent 65%); }
.theme-misty  .card-aurora { background: radial-gradient(ellipse, #94a3b8, transparent 65%); }

/* ── Header ───────────────────────────────────── */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
}

.location-info {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.location-pin {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(99,102,241,0.12);
  border: 1px solid rgba(99,102,241,0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--card-accent, var(--color-primary));
  transition: background var(--duration-base), transform var(--duration-base) var(--ease-smooth);
}

.weather-card:hover .location-pin {
  background: rgba(99,102,241,0.20);
  transform: scale(1.05);
}

.location-pin svg { width: 20px; height: 20px; }

.location-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.city-name {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.05;
  letter-spacing: -0.8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.city-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.country-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: rgba(99,102,241,0.12);
  border: 1px solid rgba(99,102,241,0.22);
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-accent);
}

.meta-sep { color: var(--color-text-subtle); }

.date-str {
  font-size: 0.76rem;
  color: var(--color-text-muted);
  text-transform: capitalize;
}

/* ── Weather icon ─────────────────────────────── */
.icon-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  position: relative;
}

.icon-glow {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--card-accent), transparent 65%);
  opacity: 0.20;
  top: 0;
  pointer-events: none;
  filter: blur(12px);
  animation: pulse-ring 3s ease-in-out infinite;
}

.weather-icon {
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 6px 24px rgba(99,102,241,0.35));
  margin-top: -24px;
  margin-bottom: -4px;
  animation: floatY 5s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

.condition-badge {
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: capitalize;
  color: var(--color-text-muted);
  background: rgba(255, 255, 255, 0.06);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.09);
  letter-spacing: 0.3px;
}

/* ── Temperature ──────────────────────────────── */
.temp-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

.temp-display {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  line-height: 1;
}

.temp-value {
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 12vw, 6.5rem);
  font-weight: 800;
  letter-spacing: -5px;
  background: linear-gradient(145deg, #fff 20%, rgba(255,255,255,0.45) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.temp-unit {
  font-size: 2.2rem;
  font-weight: 300;
  color: var(--color-text-muted);
  margin-top: 12px;
}

.temp-meta {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-end;
}

.feels-like {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
}

.meta-label {
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-subtle);
}

.meta-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.temp-range {
  display: flex;
  gap: 14px;
}

.range-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: var(--font-display);
}

.range-icon { width: 14px; height: 14px; }

.range-low  { color: #60a5fa; }
.range-high { color: #fb923c; }

/* ── Wave divider ─────────────────────────────── */
.wave-divider {
  margin: 20px -32px 24px;
  height: 20px;
  overflow: hidden;
}

.wave-divider svg {
  width: 100%;
  height: 100%;
}

/* ── Details Grid ─────────────────────────────── */
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.detail-card {
  position: relative;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-lg);
  padding: 18px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  transition:
    background var(--duration-base),
    border-color var(--duration-base),
    transform var(--duration-base) var(--ease-smooth),
    box-shadow var(--duration-base);
}

/* Subtle tinted top-left corner on each detail card */
.detail-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 0% 0%, var(--detail-color-alpha), transparent 80%);
  pointer-events: none;
}

.detail-card:hover {
  background: rgba(255, 255, 255, 0.065);
  border-color: rgba(255, 255, 255, 0.14);
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 10px 32px rgba(0,0,0,0.30);
}

.detail-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--detail-color-alpha);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--detail-color);
}

.detail-icon svg { width: 18px; height: 18px; }

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-subtle);
}

.detail-value {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.05;
  letter-spacing: -0.5px;
}

.detail-value small {
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 2px;
  font-family: var(--font-body);
}

/* Progress bar with label */
.detail-bar-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.detail-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--detail-color), color-mix(in srgb, var(--detail-color) 60%, white));
  border-radius: var(--radius-full);
  transition: width 1s var(--ease-out);
}

.detail-bar-pct {
  font-size: 0.65rem;
  color: var(--color-text-subtle);
  white-space: nowrap;
  font-family: var(--font-display);
  font-weight: 500;
}

/* ── Responsive ───────────────────────────────── */
@media (max-width: 520px) {
  .weather-card { padding: 28px 18px 22px; }

  .card-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .location-info { flex-direction: column; align-items: center; }
  .location-text { align-items: center; }
  .city-meta     { justify-content: center; }

  .temp-section {
    flex-direction: column;
    align-items: center;
    margin-bottom: 4px;
  }

  .temp-meta { align-items: center; }
  .temp-range { justify-content: center; }

  .wave-divider { margin: 20px -18px 20px; }

  .details-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .detail-bar-pct { display: none; }
}

/* ── Recommendation Banner ─────────────────── */
.recommendation-banner {
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.022);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  display: flex;
  gap: 14px;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: background var(--duration-base), border-color var(--duration-base);
  text-align: left;
}

.recommendation-banner:hover {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.12);
}

.recommendation-banner::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--card-accent);
}

.rec-icon {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: floatY 3s ease-in-out infinite;
}

.rec-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rec-title {
  font-size: 0.70rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
  color: var(--card-accent);
}

.rec-text {
  font-size: 0.84rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}
</style>
