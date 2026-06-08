<template>
  <div class="spinner-wrap" role="status" aria-live="polite" aria-label="Cargando datos del clima">

    <!-- Radar / sonar animation -->
    <div class="radar-container" aria-hidden="true">
      <div class="radar-ring r1"></div>
      <div class="radar-ring r2"></div>
      <div class="radar-ring r3"></div>

      <!-- Inner spinner -->
      <div class="spinner-core">
        <div class="spinner-ring outer-ring"></div>
        <div class="spinner-ring inner-ring"></div>
        <div class="spinner-dot"></div>
        <span class="spinner-globe">🌐</span>
      </div>
    </div>

    <!-- Text -->
    <div class="spinner-body">
      <div class="spinner-title-row">
        <span class="spinner-title">Obteniendo datos</span>
        <span class="dots-row" aria-hidden="true">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
      </div>
      <p class="spinner-subtitle">Consultando información meteorológica en tiempo real</p>
    </div>

    <!-- Progress shimmer bar -->
    <div class="progress-wrap" aria-hidden="true">
      <div class="progress-bar"></div>
    </div>

  </div>
</template>

<style scoped>
/* ── Wrapper ───────────────────────────────── */
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 24px;
  animation: fadeIn 0.35s ease both;
}

/* ── Radar rings ───────────────────────────── */
.radar-container {
  position: relative;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid transparent;
  animation: radarPing 3s ease-out infinite;
}

.r1 {
  border-color: rgba(99, 102, 241, 0.5);
  animation-delay: 0s;
}
.r2 {
  border-color: rgba(34, 211, 238, 0.35);
  animation-delay: 1s;
}
.r3 {
  border-color: rgba(167, 139, 250, 0.25);
  animation-delay: 2s;
}

/* ── Core spinner ──────────────────────────── */
.spinner-core {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.spinner-ring {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: transparent;
}

.outer-ring {
  inset: 0;
  border-width: 3px;
  border-top-color: var(--color-primary);
  border-right-color: rgba(99, 102, 241, 0.20);
  animation: spin 1.1s linear infinite;
}

.inner-ring {
  inset: 12px;
  border-width: 2.5px;
  border-bottom-color: var(--color-cyan);
  border-left-color: rgba(34, 211, 238, 0.20);
  animation: spinReverse 0.8s linear infinite;
}

.spinner-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  box-shadow: 0 0 16px var(--color-primary), 0 0 30px rgba(99,102,241,0.5);
  animation: pulse-ring 1.5s ease-in-out infinite;
}

.spinner-globe {
  font-size: 1.6rem;
  animation: spin 8s linear infinite;
  display: inline-block;
  position: relative;
  z-index: 1;
}

/* ── Text block ────────────────────────────── */
.spinner-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.spinner-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.3px;
}

/* Animated dots */
.dots-row {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  padding-bottom: 2px;
}

.dot {
  width: 4px;
  height: 4px;
  background: var(--color-cyan);
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.18s; }
.dot:nth-child(3) { animation-delay: 0.36s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
  40%            { transform: translateY(-6px); opacity: 1;   }
}

.spinner-subtitle {
  font-size: 0.80rem;
  color: var(--color-text-subtle);
  letter-spacing: 0.2px;
  text-align: center;
  max-width: 260px;
  line-height: 1.5;
}

/* ── Progress shimmer bar ──────────────────── */
.progress-wrap {
  width: 200px;
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  width: 45%;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg,
    transparent 0%,
    var(--color-primary) 40%,
    var(--color-cyan) 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
</style>
