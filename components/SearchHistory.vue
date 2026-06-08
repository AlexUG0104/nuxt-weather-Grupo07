<template>
  <div class="history-panel" v-if="history.length > 0">

    <!-- Header -->
    <div class="history-header">
      <div class="history-title-group">
        <div class="history-icon-wrap" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="12 8 12 12 14 14"/>
            <path d="M3.05 11a9 9 0 1 0 .5-4.5"/>
            <polyline points="3 3 3 7 7 7"/>
          </svg>
        </div>
        <h3 class="history-title">Búsquedas recientes</h3>
        <span class="history-count">{{ history.length }}</span>
      </div>
      <button @click="$emit('clear')" class="clear-btn" id="clear-history-btn" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
        Limpiar
      </button>
    </div>

    <!-- Chips -->
    <ul class="history-chips" role="list">
      <li
        v-for="(item, index) in history"
        :key="item.date"
        class="chip-item"
        :style="{ '--delay': `${index * 0.04}s` }"
      >
        <button
          class="chip"
          @click="$emit('select', item.city)"
          :title="`Buscar ${item.city} — ${formatDate(item.date)}`"
          type="button"
        >
          <span class="chip-dot" aria-hidden="true"></span>
          <span class="chip-city">{{ item.city }}</span>
          <span class="chip-time">{{ formatDate(item.date) }}</span>
        </button>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import type { WeatherHistory } from '~/types/weather';

defineProps<{
  history: WeatherHistory[];
}>();

defineEmits<{
  (e: 'select', city: string): void;
  (e: 'clear'): void;
}>();

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>

<style scoped>
/* ── Panel ─────────────────────────────────── */
.history-panel {
  background: rgba(255, 255, 255, 0.028);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-top-color: rgba(255,255,255,0.12);
  border-radius: var(--radius-xl);
  padding: 22px 24px 20px;
  animation: fadeInUp 0.45s var(--ease-out) both;
}

/* Subtle top accent line */
.history-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(167,139,250,0.45), transparent);
  border-radius: var(--radius-full);
}

.history-panel {
  position: relative;
  overflow: hidden;
}

/* ── Header ─────────────────────────────────── */
.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.history-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.history-icon-wrap {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: rgba(167, 139, 250, 0.12);
  border: 1px solid rgba(167,139,250,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  flex-shrink: 0;
}

.history-icon-wrap svg { width: 14px; height: 14px; }

.history-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.1px;
}

.history-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: var(--radius-full);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--color-accent);
}

/* ── Clear button ───────────────────────────── */
.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--color-text-subtle);
  padding: 5px 11px;
  border-radius: var(--radius-sm);
  transition:
    background var(--duration-fast),
    border-color var(--duration-fast),
    color var(--duration-fast);
}

.clear-btn:hover {
  background: rgba(248, 113, 113, 0.09);
  border-color: rgba(248, 113, 113, 0.22);
  color: var(--color-error);
}

.clear-btn svg { width: 12px; height: 12px; }

/* ── Chips list ─────────────────────────────── */
.history-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip-item {
  animation: slideInLeft 0.3s var(--ease-out) var(--delay, 0s) both;
}

/* ── Single chip ────────────────────────────── */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px 7px 10px;
  background: rgba(99,102,241,0.06);
  border: 1px solid rgba(99,102,241,0.15);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    background var(--duration-fast),
    border-color var(--duration-fast),
    transform var(--duration-base) var(--ease-smooth),
    box-shadow var(--duration-base);
  text-align: left;
  font-family: var(--font-body);
}

.chip:hover {
  background: rgba(99,102,241,0.14);
  border-color: rgba(99,102,241,0.38);
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 20px rgba(99,102,241,0.18);
}

.chip:active {
  transform: scale(0.97);
}

.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-cyan));
  flex-shrink: 0;
}

.chip-city {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--color-text);
  text-transform: capitalize;
  letter-spacing: -0.2px;
}

.chip-time {
  font-size: 0.70rem;
  color: var(--color-text-subtle);
  font-weight: 400;
  font-family: var(--font-display);
}
</style>
