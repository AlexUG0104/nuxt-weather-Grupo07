<template>
  <div class="spinner-wrap" role="status" aria-live="polite" aria-label="Cargando">
    <!-- Spinner rings -->
    <div class="spinner-rings" aria-hidden="true">
      <div class="ring ring-outer"></div>
      <div class="ring ring-inner"></div>
      <div class="ring-dot"></div>
    </div>
    <!-- Text -->
    <div class="spinner-text">
      <span class="spinner-title">Obteniendo datos</span>
      <span class="spinner-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    </div>
    <p class="spinner-subtitle">Consultando información meteorológica</p>
  </div>
</template>

<style scoped>
/* ── Wrapper ───────────────────────────────── */
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 20px;
  gap: 20px;
  animation: fadeIn 0.3s ease both;
}

/* ── Rings ─────────────────────────────────── */
.spinner-rings {
  position: relative;
  width: 64px;
  height: 64px;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: transparent;
  animation: spin 1s linear infinite;
}

.ring-outer {
  inset: 0;
  border-width: 2.5px;
  border-top-color: var(--color-primary);
  border-right-color: rgba(91, 156, 246, 0.25);
  animation-duration: 1s;
}

.ring-inner {
  inset: 10px;
  border-width: 2.5px;
  border-bottom-color: var(--color-accent);
  border-left-color: rgba(167, 139, 250, 0.25);
  animation-direction: reverse;
  animation-duration: 0.75s;
}

.ring-dot {
  position: absolute;
  width: 7px;
  height: 7px;
  background: var(--color-primary);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 12px var(--color-primary);
  animation: pulse-ring 1.5s ease-in-out infinite;
}

/* ── Text ──────────────────────────────────── */
.spinner-text {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spinner-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

/* Animated dots */
.spinner-dots {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  padding-bottom: 2px;
}

.dot {
  width: 4px;
  height: 4px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: dotBounce 1.2s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0);   opacity: 0.4; }
  40%           { transform: translateY(-5px); opacity: 1;   }
}

.spinner-subtitle {
  font-size: 0.82rem;
  color: var(--color-text-subtle);
  letter-spacing: 0.3px;
}
</style>
