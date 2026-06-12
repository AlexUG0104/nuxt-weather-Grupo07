<template>
  <div class="search-wrapper">

    <!-- Search bar container -->
    <div class="search-outer" :class="{ focused: isFocused }">
      <!-- Animated gradient border (only visible when focused) -->
      <div class="search-border-glow" aria-hidden="true"></div>

      <div class="search-bar">
        <!-- Globe/pin icon -->
        <div class="search-icon-wrap" aria-hidden="true">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>

        <!-- Input -->
        <input
          id="city-search-input"
          type="text"
          v-model="searchQuery"
          placeholder="Ej: San José, Madrid, Tokyo..."
          @keyup.enter="handleSearch"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="search-input"
          autocomplete="off"
          spellcheck="false"
          aria-label="Buscar ciudad"
        />

        <!-- Clear button -->
        <Transition name="pop">
          <button
            v-if="searchQuery.length > 0"
            @click="searchQuery = ''"
            class="clear-btn"
            aria-label="Limpiar búsqueda"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </Transition>

        <!-- Search button -->
        <button
          @click="handleSearch"
          class="search-btn"
          :disabled="searchQuery.trim().length === 0"
          id="search-submit-btn"
          type="button"
          :aria-label="`Buscar ${searchQuery || 'ciudad'}`"
        >
          <span class="btn-content">
            <span class="btn-text">Buscar</span>
            <svg class="btn-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
          <!-- Button shine -->
          <span class="btn-shine" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <!-- Keyboard hint -->
    <p class="search-hint">
      Presiona <kbd>Enter</kbd> para buscar · <kbd>Esc</kbd> para limpiar
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'search', city: string): void;
}>();

const searchQuery = ref('');
const isFocused = ref(false);

const handleSearch = () => {
  if (searchQuery.value.trim() !== '') {
    emit('search', searchQuery.value.trim());
    searchQuery.value = '';
  }
};
</script>

<style scoped>
/* ── Wrapper ───────────────────────────────────── */
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: fadeInUp 0.6s var(--ease-out) both;
}

/* ── Outer — holds gradient border effect ──────── */
.search-outer {
  width: 100%;
  position: relative;
  border-radius: calc(var(--radius-xl) + 2px);
  padding: 1.5px;
  background: rgba(255,255,255,0.07);
  transition: background var(--duration-base);
}

.search-outer.focused {
  background: linear-gradient(135deg, rgba(99,102,241,0.7), rgba(34,211,238,0.6), rgba(167,139,250,0.7));
}

/* Glow ring behind the focused search bar */
.search-border-glow {
  position: absolute;
  inset: -4px;
  border-radius: calc(var(--radius-xl) + 6px);
  background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(34,211,238,0.20), rgba(167,139,250,0.25));
  opacity: 0;
  filter: blur(10px);
  transition: opacity var(--duration-base);
  pointer-events: none;
  z-index: -1;
}

.search-outer.focused .search-border-glow {
  opacity: 1;
  animation: borderGlow 3s ease-in-out infinite;
}

/* ── Inner search bar ──────────────────────────── */
.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(6, 13, 31, 0.85);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border-radius: var(--radius-xl);
  padding: 7px 7px 7px 20px;
  transition: background var(--duration-base);
}

.search-outer.focused .search-bar {
  background: rgba(8, 16, 38, 0.92);
}

/* ── Search icon ───────────────────────────────── */
.search-icon-wrap {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--color-text-subtle);
  transition: color var(--duration-base), transform var(--duration-base) var(--ease-smooth);
  margin-right: 12px;
}

.search-outer.focused .search-icon-wrap {
  color: var(--color-cyan);
  transform: scale(1.1);
}

.search-icon { width: 19px; height: 19px; }

/* ── Input ─────────────────────────────────────── */
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-body);
  font-size: 1.02rem;
  font-weight: 400;
  color: var(--color-text);
  caret-color: var(--color-cyan);
  min-width: 0;
  padding: 10px 0;
}

.search-input::placeholder {
  color: var(--color-text-subtle);
  transition: color var(--duration-base);
}

.search-input:focus::placeholder {
  color: rgba(255, 255, 255, 0.20);
}

/* ── Clear button ──────────────────────────────── */
.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.07);
  color: var(--color-text-muted);
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 8px;
  transition:
    background var(--duration-fast),
    color var(--duration-fast),
    transform var(--duration-base) var(--ease-smooth);
}

.clear-btn:hover {
  background: rgba(248, 113, 113, 0.16);
  color: var(--color-error);
  transform: rotate(90deg) scale(1.1);
}

.clear-btn svg { width: 13px; height: 13px; }

/* ── Search button ─────────────────────────────── */
.search-btn {
  position: relative;
  display: flex;
  align-items: center;
  padding: 13px 24px;
  border-radius: var(--radius-lg);
  border: none;
  background: linear-gradient(135deg, #6366f1, #a78bfa, #22d3ee);
  background-size: 200% 200%;
  animation: gradientFlow 5s ease infinite;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  overflow: hidden;
  transition:
    opacity var(--duration-fast),
    transform var(--duration-base) var(--ease-smooth),
    box-shadow var(--duration-base);
  box-shadow:
    0 4px 20px rgba(99,102,241,0.45),
    0 1px 0 rgba(255,255,255,0.20) inset;
  white-space: nowrap;
}

.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Shine overlay */
.btn-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
  background-size: 200% 100%;
  background-position: -100% 0;
  transition: background-position 0.5s;
}

.search-btn:hover:not(:disabled) .btn-shine {
  background-position: 200% 0;
}

.search-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow:
    0 8px 30px rgba(99,102,241,0.55),
    0 1px 0 rgba(255,255,255,0.25) inset;
}

.search-btn:active:not(:disabled) {
  transform: scale(0.96);
}

.search-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  box-shadow: none;
  animation: none;
  background: rgba(99,102,241,0.35);
}

.btn-arrow {
  width: 15px;
  height: 15px;
  transition: transform var(--duration-base) var(--ease-smooth);
}

.search-btn:hover:not(:disabled) .btn-arrow {
  transform: translateX(4px);
}

/* ── Hint ──────────────────────────────────────── */
.search-hint {
  font-size: 0.73rem;
  color: var(--color-text-subtle);
  letter-spacing: 0.2px;
}

kbd {
  display: inline-block;
  padding: 1px 7px;
  font-family: var(--font-display);
  font-size: 0.70rem;
  font-weight: 600;
  background: rgba(99,102,241,0.10);
  border: 1px solid rgba(99,102,241,0.22);
  border-radius: 5px;
  color: var(--color-accent);
}

/* ── Transitions ───────────────────────────────── */
/* Pop in/out for clear button */
.pop-enter-active { transition: all 0.2s var(--ease-smooth); }
.pop-leave-active { transition: all 0.15s ease-in; }
.pop-enter-from   { opacity: 0; transform: scale(0.6) rotate(-20deg); }
.pop-leave-to     { opacity: 0; transform: scale(0.6) rotate(20deg);  }

/* ── Responsive ────────────────────────────────── */
@media (max-width: 480px) {
  .btn-text { display: none; }
  .search-btn { padding: 13px 15px; }
  .search-bar { padding-left: 14px; }
}
</style>
