<template>
  <div class="error-card" role="alert">
    <!-- Glow -->
    <div class="error-glow" aria-hidden="true"></div>

    <!-- Icon -->
    <div class="error-icon-wrap" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>

    <!-- Content -->
    <div class="error-content">
      <h3 class="error-title">Ha ocurrido un error</h3>
      <p class="error-message">{{ message }}</p>
    </div>

    <!-- Hint -->
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
</script>

<style scoped>
/* ── Card ──────────────────────────────────── */
.error-card {
  position: relative;
  background: rgba(248, 113, 113, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(248, 113, 113, 0.18);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
  animation: slideIn 0.35s var(--ease-out) both;
}

/* Top border accent */
.error-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #f87171, #fbbf24);
}

/* ── Glow ──────────────────────────────────── */
.error-glow {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(248,113,113,0.25), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* ── Icon ──────────────────────────────────── */
.error-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(248, 113, 113, 0.14);
  border: 1px solid rgba(248, 113, 113, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-error);
  flex-shrink: 0;
}

.error-icon-wrap svg {
  width: 22px;
  height: 22px;
}

/* ── Content ───────────────────────────────── */
.error-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.error-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #fca5a5;
  margin: 0;
}

.error-message {
  font-size: 0.88rem;
  color: rgba(252, 165, 165, 0.75);
  line-height: 1.55;
  margin: 0;
}

/* ── Hint ──────────────────────────────────── */
.error-hint {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.78rem;
  color: rgba(248, 113, 113, 0.55);
  padding-top: 4px;
  border-top: 1px solid rgba(248, 113, 113, 0.10);
}

.hint-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* ── Animation ─────────────────────────────── */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
