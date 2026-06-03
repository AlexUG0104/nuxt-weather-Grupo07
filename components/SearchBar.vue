<template>
  <div class="search-wrapper">
    <div class="search-bar" :class="{ focused: isFocused }">
      <!-- Search Icon -->
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
      <Transition name="fade">
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

      <!-- Search Button -->
      <button
        @click="handleSearch"
        class="search-btn"
        :disabled="searchQuery.trim().length === 0"
        id="search-submit-btn"
        type="button"
      >
        <span class="btn-text">Buscar</span>
        <svg class="btn-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
    </div>

    <!-- Hint text -->
    <p class="search-hint">
      Presiona <kbd>Enter</kbd> para buscar rápidamente
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'search', city: string): void
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
/* ── Wrapper ───────────────────────────────── */
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: fadeInUp 0.5s var(--ease-out) both;
}

/* ── Search bar container ──────────────────── */
.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1.5px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-xl);
  padding: 6px 6px 6px 18px;
  transition: border-color var(--duration-base) ease,
              box-shadow var(--duration-base) ease,
              background var(--duration-base) ease;
  position: relative;
}

.search-bar.focused {
  border-color: rgba(91, 156, 246, 0.50);
  box-shadow: 0 0 0 4px rgba(91, 156, 246, 0.10),
              0 8px 32px rgba(0, 0, 0, 0.35);
  background: rgba(255, 255, 255, 0.07);
}

/* ── Search icon ───────────────────────────── */
.search-icon-wrap {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: color var(--duration-base) ease;
  margin-right: 10px;
}

.search-bar.focused .search-icon-wrap {
  color: var(--color-primary);
}

.search-icon {
  width: 18px;
  height: 18px;
}

/* ── Input ─────────────────────────────────── */
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text);
  caret-color: var(--color-primary);
  min-width: 0;
  padding: 10px 0;
}

.search-input::placeholder {
  color: var(--color-text-subtle);
  transition: color var(--duration-base) ease;
}

.search-input:focus::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

/* ── Clear button ──────────────────────────── */
.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.07);
  color: var(--color-text-muted);
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 8px;
  transition: background var(--duration-fast) ease,
              color var(--duration-fast) ease;
}

.clear-btn:hover {
  background: rgba(248, 113, 113, 0.15);
  color: var(--color-error);
}

.clear-btn svg {
  width: 13px;
  height: 13px;
}

/* ── Search button ─────────────────────────── */
.search-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: var(--radius-lg);
  border: none;
  background: var(--gradient-brand);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.93rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity var(--duration-fast) ease,
              transform var(--duration-fast) var(--ease-smooth),
              box-shadow var(--duration-base) ease;
  box-shadow: 0 4px 16px rgba(91, 156, 246, 0.35);
  white-space: nowrap;
}

.search-btn:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(91, 156, 246, 0.50);
}

.search-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.search-btn:disabled {
  opacity: 0.40;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-arrow {
  width: 15px;
  height: 15px;
  transition: transform var(--duration-base) ease;
}

.search-btn:hover:not(:disabled) .btn-arrow {
  transform: translateX(3px);
}

/* ── Hint ──────────────────────────────────── */
.search-hint {
  font-size: 0.75rem;
  color: var(--color-text-subtle);
}

kbd {
  display: inline-block;
  padding: 1px 6px;
  font-family: var(--font-body);
  font-size: 0.72rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: var(--color-text-muted);
}

/* ── Transitions ───────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-fast) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Responsive ────────────────────────────── */
@media (max-width: 480px) {
  .btn-text {
    display: none;
  }

  .search-btn {
    padding: 12px 14px;
  }
}
</style>
