<script setup>
import { computed } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { HERO_IMAGE } from '../../constants/home'

defineEmits(['explore', 'register', 'reservations'])

const { isAuthenticated, user } = useAuth()

const greeting = computed(() => {
  if (!isAuthenticated.value) return 'Planeje sua estadia com praticidade!'
  return `Sua proxima parada, ${user.value?.username || 'hospede'}`
})
</script>

<template>
  <section
    class="hero-section"
    :style="{
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(41, 41, 41, 0.68), rgba(0, 0, 0, 0.18)), url(${HERO_IMAGE})`,
    }"
  >
    <div class="home-container hero-content">
      <div class="hero-copy">
        <q-badge color="white" text-color="black" class="q-mb-md hero-badge" label="Host Flow viagens" />
        <h1>{{ greeting }}</h1>
        <p>
          Descubra lugares, compare estilos de hospedagem e siga para a reserva
          quando encontrar uma opção que combina com a sua viagem.
        </p>
        <div class="hero-actions">
          <q-btn
            unelevated
            color="white"
            text-color="black"
            icon="search"
            :label="isAuthenticated ? 'Explorar opções' : 'Ver sugestões'"
            @click="$emit('explore')"
          />
          <q-btn
            v-if="!isAuthenticated"
            outline
            color="white"
            icon="person_add"
            label="Criar conta"
            @click="$emit('register')"
          />
          <q-btn
            v-else
            outline
            color="white"
            icon="event_available"
            label="Minhas reservas"
            @click="$emit('reservations')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 520px;
  background-position: center;
  background-size: cover;
  color: var(--color-text-inverse);
}

.hero-content {
  display: flex;
  align-items: center;
  min-height: 520px;
  padding: 56px 0 82px;
}

.hero-copy {
  max-width: 720px;
}

.hero-badge {
  letter-spacing: 0;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 0;
  max-width: 840px;
  font-size: clamp(2.25rem, 7vw, 4.55rem);
  font-weight: 800;
  line-height: 1.04;
}

.hero-copy p {
  max-width: 640px;
  margin: 22px 0 0;
  font-size: 1.16rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.92);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

@media (max-width: 599px) {
  .hero-section,
  .hero-content {
    min-height: 560px;
  }

  .hero-content {
    padding: 42px 0 78px;
  }

  .hero-copy p {
    font-size: 1rem;
  }
}
</style>
