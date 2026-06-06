<script setup>
import { useAuth } from '../../composables/useAuth'

defineEmits(['login', 'register', 'reservations'])

const { isAuthenticated } = useAuth()
</script>

<template>
  <section class="home-section cta-section">
    <div class="home-container cta-content">
      <div>
        <h2>{{ isAuthenticated ? 'Continue planejando sua viagem' : 'Entre para reservar com mais facilidade' }}</h2>
        <p>
          {{ isAuthenticated
            ? 'Acesse suas reservas, compare hospedagens e acompanhe suas proximas estadias.'
            : 'Com uma conta, voce pode criar reservas e voltar rapidamente para as opcoes favoritas.' }}
        </p>
      </div>
      <div class="cta-actions">
        <q-btn
          unelevated
          color="white"
          text-color="black"
          :icon="isAuthenticated ? 'event_available' : 'login'"
          :label="isAuthenticated ? 'Ver reservas' : 'Fazer login'"
          @click="$emit(isAuthenticated ? 'reservations' : 'login')"
        />
        <q-btn
          v-if="!isAuthenticated"
          outline
          color="white"
          icon="person_add"
          label="Criar conta"
          @click="$emit('register')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: var(--color-bg-inverse);
  color: var(--color-text-inverse);
}

.cta-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
}

.cta-content h2 {
  margin: 0;
  font-size: clamp(1.7rem, 4vw, 2.45rem);
  font-weight: 800;
  line-height: 1.12;
}

.cta-content p {
  max-width: 620px;
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.82);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

@media (max-width: 1023px) {
  .cta-content {
    align-items: start;
    flex-direction: column;
  }
}
</style>
