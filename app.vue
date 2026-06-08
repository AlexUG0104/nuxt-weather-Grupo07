<template>
  <div class="app-shell">
    <!-- Star field background -->
    <div class="starfield" aria-hidden="true"></div>
    <!-- Floating orb extra -->
    <div class="orb-extra" aria-hidden="true"></div>
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

/* Extra floating orb (bottom-right) */
.orb-extra {
  position: fixed;
  bottom: -180px;
  right: -120px;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle at 60% 60%, rgba(34,211,238,0.14), transparent 65%);
  filter: blur(50px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: orbFloat 22s ease-in-out infinite alternate-reverse;
}
</style>
