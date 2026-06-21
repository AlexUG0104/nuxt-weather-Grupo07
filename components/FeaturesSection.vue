<template>
  <section class="features-container">
    
    <!-- 1. ¿Qué hace la aplicación? -->
    <div class="intro-section">
      <h2 class="section-title">¿Qué hace la aplicación?</h2>
      <div class="intro-grid">
        <div class="intro-card">
          <span class="intro-num">01</span>
          <h3 class="intro-card-title">Clima en tiempo real</h3>
          <p class="intro-card-desc">Obtén la información meteorológica actual de cualquier rincón del mundo al instante.</p>
        </div>
        <div class="intro-card">
          <span class="intro-num">02</span>
          <h3 class="intro-card-title">OpenWeatherMap API</h3>
          <p class="intro-card-desc">Integración directa con el proveedor líder global de datos climáticos de alta fidelidad.</p>
        </div>
        <div class="intro-card">
          <span class="intro-num">03</span>
          <h3 class="intro-card-title">Datos actualizados</h3>
          <p class="intro-card-desc">Monitoreo dinámico con actualizaciones cada 10 minutos para una precisión absoluta.</p>
        </div>
        <div class="intro-card">
          <span class="intro-num">04</span>
          <h3 class="intro-card-title">Interfaz ágil</h3>
          <p class="intro-card-desc">Experiencia de usuario limpia, intuitiva y optimizada para consultas en un solo clic.</p>
        </div>
      </div>
    </div>

    <!-- 2. Tarjetas visuales de características -->
    <div class="features-grid-section">
      <h2 class="section-title">Características Clave</h2>
      <div class="features-grid">
        <!-- Card 1 -->
        <div class="feature-card" style="--card-glow: rgba(251, 191, 36, 0.15);">
          <div class="feature-icon-wrap" style="color: #fbbf24; background: rgba(251, 191, 36, 0.1);">🌡️</div>
          <h3 class="feature-name">Temperatura actual</h3>
          <p class="feature-desc">Sensación térmica, temperatura mínima y máxima representadas visualmente.</p>
        </div>
        <!-- Card 2 -->
        <div class="feature-card" style="--card-glow: rgba(34, 211, 238, 0.15);">
          <div class="feature-icon-wrap" style="color: #22d3ee; background: rgba(34, 211, 238, 0.1);">💧</div>
          <h3 class="feature-name">Humedad</h3>
          <p class="feature-desc">Métrica porcentual detallada con barras de nivel progresivas en tiempo real.</p>
        </div>
        <!-- Card 3 -->
        <div class="feature-card" style="--card-glow: rgba(99, 102, 241, 0.15);">
          <div class="feature-icon-wrap" style="color: #6366f1; background: rgba(99, 102, 241, 0.1);">🌬️</div>
          <h3 class="feature-name">Velocidad del viento</h3>
          <p class="feature-desc">Velocidad en m/s e indicador de la dirección del viento cardinal exacta.</p>
        </div>
        <!-- Card 4 -->
        <div class="feature-card" style="--card-glow: rgba(167, 139, 250, 0.15);">
          <div class="feature-icon-wrap" style="color: #a78bfa; background: rgba(167, 139, 250, 0.1);">📍</div>
          <h3 class="feature-name">Consulta por ciudad</h3>
          <p class="feature-desc">Geolocalización meteorológica inteligente que soporta cualquier ciudad del globo.</p>
        </div>
        <!-- Card 5 -->
        <div class="feature-card" style="--card-glow: rgba(244, 63, 94, 0.15);">
          <div class="feature-icon-wrap" style="color: #f43f5e; background: rgba(244, 63, 94, 0.1);">🕒</div>
          <h3 class="feature-name">Historial de búsquedas</h3>
          <p class="feature-desc">Acceso rápido a las últimas 5 búsquedas con persistencia en localStorage.</p>
        </div>
        <!-- Card 6 -->
        <div class="feature-card" style="--card-glow: rgba(16, 185, 129, 0.15);">
          <div class="feature-icon-wrap" style="color: #10b981; background: rgba(16, 185, 129, 0.1);">📱</div>
          <h3 class="feature-name">Diseño responsive</h3>
          <p class="feature-desc">Adaptación perfecta a dispositivos móviles, tablets y ordenadores.</p>
        </div>
      </div>
    </div>

    <!-- 3. ¿Por qué usar WeatherVue? -->
    <div class="why-us-section">
      <div class="why-card">
        <h2 class="why-title">¿Por qué usar WeatherVue?</h2>
        <p class="why-desc">
          WeatherVue permite consultar condiciones climáticas de forma inmediata desde cualquier dispositivo, ofreciendo una experiencia moderna, intuitiva y confiable.
        </p>
      </div>
    </div>

  </section>
</template>

<style scoped>
.features-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  display: flex;
  flex-direction: column;
  gap: 80px;
  animation: fadeIn var(--duration-slow) var(--ease-out) both;
}

.section-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 36px;
  letter-spacing: -0.5px;
}

/* --- ¿Qué hace la aplicación? --- */
.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.intro-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background var(--duration-base), border-color var(--duration-base);
}

.intro-card:hover {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.12);
}

.intro-num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.8rem;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.85;
}

.intro-card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text);
}

.intro-card-desc {
  font-size: 0.86rem;
  color: var(--color-text-subtle);
  line-height: 1.5;
}

/* --- Características Grid --- */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-xl);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  transition: background 0.3s, border-color 0.3s, transform 0.3s var(--ease-smooth), box-shadow 0.3s;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle at 0% 0%, var(--card-glow), transparent 70%);
  pointer-events: none;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.feature-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  border: 1px solid rgba(255,255,255,0.05);
}

.feature-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 4px;
}

.feature-desc {
  font-size: 0.88rem;
  color: var(--color-text-subtle);
  line-height: 1.5;
}

/* --- ¿Por qué nosotros? --- */
.why-us-section {
  width: 100%;
}

.why-card {
  background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(34,211,238,0.04) 100%);
  border: 1px solid rgba(99, 102, 241, 0.20);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  text-align: center;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.why-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.why-desc {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 660px;
  margin: 0 auto;
}

@media (max-width: 520px) {
  .why-card { padding: 28px 20px; }
  .why-title { font-size: 1.45rem; }
  .why-desc { font-size: 0.95rem; }
  .features-container { gap: 60px; }
}
</style>
