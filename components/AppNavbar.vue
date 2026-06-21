<template>
  <nav class="navbar" role="navigation" aria-label="Navegación principal">
    <div class="nav-container">
      <NuxtLink to="/" class="nav-logo">
        <span class="logo-icon" aria-hidden="true">🌐</span>
        <span class="logo-text">WeatherVue</span>
      </NuxtLink>
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link" active-class="active" exact>Inicio</NuxtLink>
        <NuxtLink to="/weather" class="nav-link" active-class="active">Clima</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  background: rgba(6, 13, 31, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background var(--duration-base);
}

.nav-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--color-text);
  transition: transform 0.2s var(--ease-smooth);
}

.nav-logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 1.3rem;
}

.logo-text {
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-link {
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-text-subtle);
  transition: color var(--duration-base), transform var(--duration-base);
  position: relative;
  padding: 4px 0;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link.active {
  color: var(--color-cyan);
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-cyan);
  border-radius: var(--radius-full);
  box-shadow: 0 0 8px var(--color-cyan);
}
</style>
