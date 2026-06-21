<template>
  <header class="hero">
    <!-- Live badge -->
    <div class="hero-badge">
      <span class="badge-pulse">
        <span class="badge-dot"></span>
        <span class="badge-ring"></span>
      </span>
      <span>SaaS Meteorológico Profesional</span>
    </div>

    <!-- Title -->
    <h1 class="hero-title">
      <span class="gradient-text">WeatherVue</span>
    </h1>
    
    <p class="hero-subtitle">
      Consulta información meteorológica en tiempo real de cualquier ciudad del mundo de forma rápida, precisa y segura.
    </p>

    <!-- CTA Button -->
    <div class="hero-cta">
      <NuxtLink to="/weather" class="cta-btn">
        <span class="btn-text">Consultar Clima</span>
        <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </NuxtLink>
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
</template>

<style scoped>
.hero {
  width: 100%;
  max-width: 800px;
  text-align: center;
  padding: 80px 20px 48px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInUp 0.7s var(--ease-out) both;
}

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

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 9vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.02;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 36px;
  font-weight: 400;
}

/* CTA button styling matching design aesthetics */
.hero-cta {
  margin-bottom: 40px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--gradient-brand);
  color: #ffffff;
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  padding: 14px 28px;
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
  transition: transform 0.25s var(--ease-smooth), box-shadow 0.25s, filter 0.25s;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 35px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(255,255,255,0.2) inset;
  filter: brightness(1.05);
}

.cta-btn:active {
  transform: translateY(0);
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.25s var(--ease-smooth);
}

.cta-btn:hover .btn-icon {
  transform: translateX(4px);
}

/* Floating weather icons */
.hero-icons {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 10px;
}

.h-icon {
  font-size: 1.6rem;
  opacity: 0.35;
  display: inline-block;
}

.h-icon--1 { animation: floatY 6s ease-in-out infinite; }
.h-icon--2 { animation: floatY 8s ease-in-out infinite; animation-delay: -1.5s; }
.h-icon--3 { animation: floatY 7s ease-in-out infinite; animation-delay: -3s; }
.h-icon--4 { animation: floatY 9s ease-in-out infinite; animation-delay: -4s; }
.h-icon--5 { animation: floatY 6.5s ease-in-out infinite; animation-delay: -2s; }
.h-icon--6 { animation: floatY 10s ease-in-out infinite; animation-delay: -5s; }

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@media (max-width: 520px) {
  .hero-title { letter-spacing: -1.5px; }
  .hero-icons { gap: 12px; }
}
</style>
