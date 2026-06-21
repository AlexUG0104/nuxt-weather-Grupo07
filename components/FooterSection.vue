<template>
  <footer class="app-footer" role="contentinfo">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="footer-brand">WeatherVue</span>
        <span class="footer-sep" aria-hidden="true">·</span>
        <span class="footer-text">Proyecto Académico - Nuxt 4 + Vue 3 + TypeScript</span>
      </div>
      <div class="footer-right">
        <span class="badge-group">Grupo 7</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 48px;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.78rem;
  color: var(--color-text-subtle);
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius-lg);
  padding: 16px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.86rem;
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

.footer-text {
  color: var(--color-text-muted);
}

.badge-group {
  display: inline-flex;
  padding: 4px 12px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  color: var(--color-cyan);
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.5px;
}

@media (max-width: 520px) {
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 14px;
    padding: 20px 16px;
  }
  .footer-left {
    flex-direction: column;
    gap: 6px;
  }
  .footer-sep {
    display: none;
  }
}
</style>
