<template>
  <div class="error-card" role="alert">

    <div class="error-glow" aria-hidden="true"></div>

    <div class="error-topbar" aria-hidden="true"></div>

    <div class="error-icon-wrap" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>

    <div class="error-content">
      <h3 class="error-title">Ha ocurrido un error</h3>
      <p class="error-message">{{ message }}</p>
      
      <button @click="$emit('retry')" class="retry-btn" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reintentar búsqueda
      </button>
    </div>

    <div class="error-hint">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="hint-icon">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/>
      </svg>
      <span>Verifica el nombre de la ciudad e intenta de nuevo</span>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();

// Declaramos el evento en TypeScript
defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<style scoped>
/* ── Card ──────────────────────────────────── */
.error-card {
  position: relative;
  background: rgba(248, 113, 113, 0.055);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(248, 113, 113, 0.20);
  border-top-color: rgba(248, 113, 113, 0.35);
  border-radius: var(--radius-lg);
  padding: 28px 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  animation: scaleIn 0.4s var(--ease-out) both;
  box-shadow:
    0 12px 40px rgba(248, 113, 113, 0.12),
    0 0 0 1px rgba(248,113,113,0.08) inset;
}

/* Gradient top bar */
.error-topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #f87171, #fbbf24, #f87171);
  background-size: 200% 100%;
  animation: gradientFlow 3s ease infinite;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

/* ── Glow ──────────────────────────────────── */
.error-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(248,113,113,0.22), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* ── Icon ──────────────────────────────────── */
.error-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-error, #f87171);
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(248,113,113,0.15);
}

.error-icon-wrap svg { width: 24px; height: 24px; }

/* ── Content ───────────────────────────────── */
.error-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.error-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: #fca5a5;
  margin: 0;
  letter-spacing: -0.2px;
}

.error-message {
  font-size: 0.87rem;
  color: rgba(252, 165, 165, 0.72);
  line-height: 1.6;
  margin: 0;
}

/* ── NUEVO: Botón Reintentar ───────────────── */
.retry-btn {
  margin-top: 10px;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.25);
  color: #f87171;
  border-radius: var(--radius-base, 8px);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.retry-btn:hover {
  background: rgba(248, 113, 113, 0.2);
  border-color: rgba(248, 113, 113, 0.4);
  transform: translateY(-2px);
}

.retry-btn:hover svg {
  transform: rotate(180deg);
}

.retry-btn:active {
  transform: translateY(0) scale(0.96);
}

/* ── Hint ──────────────────────────────────── */
.error-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.76rem;
  color: rgba(248, 113, 113, 0.50);
  padding-top: 8px;
  border-top: 1px solid rgba(248, 113, 113, 0.10);
  line-height: 1.4;
}

.hint-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
</style>