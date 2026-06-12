<template>
  <div class="app-shell">
    <!-- Decorative grid overlay -->
    <div class="grid-overlay" aria-hidden="true"></div>

    <!-- Star field background -->
    <div class="starfield" aria-hidden="true"></div>

    <!-- Floating orb extra -->
    <div class="orb-extra" aria-hidden="true"></div>

    <!-- Atmospheric Weather Effects -->
    <div class="atmosphere-overlay" aria-hidden="true">
      <!-- Rain Effect -->
      <div v-if="weatherType === 'rainy'" class="rain-container">
        <div v-for="n in 35" :key="'r' + n" class="raindrop" :style="getRainStyle(n)"></div>
      </div>

      <!-- Snow Effect -->
      <div v-if="weatherType === 'snowy'" class="snow-container">
        <div v-for="n in 20" :key="'s' + n" class="snowflake" :style="getSnowStyle(n)">❄</div>
      </div>

      <!-- Sunny Solar Ray Glow -->
      <div v-if="weatherType === 'sunny'" class="sunny-container"></div>

      <!-- Cloudy / Fog Effect -->
      <div v-if="weatherType === 'cloudy'" class="cloudy-container">
        <div v-for="n in 5" :key="'c' + n" class="cloud-vapor" :style="getCloudStyle(n)"></div>
      </div>
    </div>

    <!-- Page content -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeather } from '~/composables/useWeather';

const { weather } = useWeather();

const weatherType = computed(() => {
  const icon = weather.value?.weather?.[0]?.icon ?? '';
  if (!icon) return 'default';
  if (icon.includes('01')) return 'sunny';
  if (icon.includes('09') || icon.includes('10') || icon.includes('11')) return 'rainy';
  if (icon.includes('13')) return 'snowy';
  if (icon.includes('50') || icon.includes('02') || icon.includes('03') || icon.includes('04')) return 'cloudy';
  return 'default';
});

// Map weather conditions to background glow colors
const themeColors = computed(() => {
  switch (weatherType.value) {
    case 'sunny':
      return { primary: '#fbbf24', accent: '#f97316' }; // Amber, Orange
    case 'rainy':
      return { primary: '#3b82f6', accent: '#0d9488' }; // Blue, Teal
    case 'snowy':
      return { primary: '#93c5fd', accent: '#e2e8f0' }; // Ice Blue, Slate
    case 'cloudy':
      return { primary: '#64748b', accent: '#8b5cf6' }; // Slate Gray, Purple
    default:
      return { primary: '#5b9cf6', accent: '#a78bfa' }; // Brand Default (Blue, Violet)
  }
});

// Dynamically set CSS variables on the document body
useHead({
  bodyAttrs: {
    style: computed(() => `
      --weather-primary: ${themeColors.value.primary};
      --weather-accent: ${themeColors.value.accent};
    `)
  }
});

// Helper style generators for particle effects
const getRainStyle = (index: number) => {
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 0.6 + Math.random() * 0.5;
  const opacity = 0.1 + Math.random() * 0.2;
  return {
    left: `${left}%`,
    top: `-80px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity
  };
};

const getSnowStyle = (index: number) => {
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 6 + Math.random() * 6;
  const opacity = 0.2 + Math.random() * 0.6;
  const size = 0.6 + Math.random() * 0.8;
  return {
    left: `${left}%`,
    top: `-20px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity,
    transform: `scale(${size})`
  };
};

const getCloudStyle = (index: number) => {
  const size = 250 + Math.random() * 300;
  const delay = index * -8;
  const duration = 30 + Math.random() * 30;
  const top = 5 + Math.random() * 45;
  const opacity = 0.04 + Math.random() * 0.05;
  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${top}vh`,
    left: `-300px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity
  };
};
</script>

<style>
.app-shell {
  position: relative;
  min-height: 100vh;
  z-index: 1;
}

/* Subtle dot-grid texture */
.grid-overlay {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none;
  z-index: 1; /* Place above background effects, below content */
}

/* Extra floating orb (bottom-right) */
.orb-extra {
  position: fixed;
  bottom: -180px;
  right: -120px;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle at 60% 60%, var(--weather-accent, rgba(34,211,238,0.14)), transparent 65%);
  filter: blur(50px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: orbFloat 22s ease-in-out infinite alternate-reverse;
  transition: background 1.5s ease;
}

/* ── Atmosphere overlays ────────────────────────── */
.atmosphere-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* --- Rain effect --- */
.rain-container {
  position: absolute;
  inset: 0;
}
.raindrop {
  position: absolute;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.6));
  width: 1px;
  height: 80px;
  animation: fall 1s linear infinite;
}
@keyframes fall {
  0% { transform: translateY(-100px) rotate(15deg); }
  100% { transform: translateY(105vh) rotate(15deg); }
}

/* --- Snow effect --- */
.snow-container {
  position: absolute;
  inset: 0;
}
.snowflake {
  position: absolute;
  color: #ffffff;
  font-size: 1.2rem;
  animation: sway 8s linear infinite;
  user-select: none;
}
@keyframes sway {
  0% { transform: translateY(-20px) translateX(0) rotate(0deg); }
  50% { transform: translateY(50vh) translateX(40px) rotate(180deg); }
  100% { transform: translateY(105vh) translateX(-20px) rotate(360deg); }
}

/* --- Sunny rays effect --- */
.sunny-container {
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle at 15% 15%, rgba(251, 191, 36, 0.12) 0%, rgba(249, 115, 22, 0.03) 40%, transparent 70%);
  animation: sunPulse 10s ease-in-out infinite alternate;
}
@keyframes sunPulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1.05); opacity: 1.2; }
}

/* --- Cloudy mist effect --- */
.cloudy-container {
  position: absolute;
  inset: 0;
}
.cloud-vapor {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12), transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  animation: drift 45s linear infinite;
}
@keyframes drift {
  0% { transform: translateX(-300px); }
  100% { transform: translateX(110vw); }
}
</style>
