<template>
  <div class="app-shell">
    <!-- Decorative grid overlay -->
    <div class="grid-overlay" aria-hidden="true"></div>
    <!-- Page content -->
    <NuxtPage />
  </div>
</template>

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
  z-index: 0;
}
</style>
