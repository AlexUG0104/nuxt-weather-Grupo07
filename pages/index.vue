<template>
  <div class="landing-page">
    <HomeHero />
    <FeaturesSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'WeatherVue — Clima en tiempo real',
  meta: [
    { name: 'description', content: 'WeatherVue te permite consultar condiciones climáticas de forma inmediata desde cualquier dispositivo con un diseño de vanguardia.' }
  ]
});
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 24px;
}
</style>
