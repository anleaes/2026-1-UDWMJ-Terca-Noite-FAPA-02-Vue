<script setup>
import { ref } from 'vue'
import { DESTINATIONS } from '../../constants/home'

defineEmits(['select'])

const slide = ref(DESTINATIONS[0].id)
</script>

<template>
  <section class="home-section">
    <div class="home-container">
      <div class="section-heading">
        <div>
          <h2>Destinos mais procurados</h2>
          <p>Estados e cidades brasileiras para inspirar a proxima reserva.</p>
        </div>
        <q-btn flat color="grey-10" icon-right="arrow_forward" label="Ver propriedades" @click="$emit('select')" />
      </div>

      <q-carousel
        v-model="slide"
        animated
        arrows
        navigation
        swipeable
        infinite
        height="360px"
        class="destination-carousel"
      >
        <q-carousel-slide
          v-for="destination in DESTINATIONS"
          :key="destination.id"
          :name="destination.id"
          class="destination-slide"
          :img-src="destination.image"
          @click="$emit('select', destination)"
        >
          <div class="destination-overlay">
            <q-icon name="location_on" size="30px" />
            <div>
              <h3>{{ destination.title }}</h3>
              <p>{{ destination.subtitle }}</p>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </section>
</template>

<style scoped>
.destination-carousel {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.13);
}

.destination-slide {
  cursor: pointer;
  padding: 0;
}

.destination-overlay {
  display: flex;
  align-items: end;
  gap: 14px;
  min-height: 100%;
  padding: 40px;
  color: var(--color-text-inverse);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.78));
}

.destination-overlay h3 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
}

.destination-overlay p {
  margin: 6px 0 0;
  max-width: 520px;
  font-size: 1.06rem;
}

@media (max-width: 599px) {
  .destination-overlay {
    align-items: end;
    padding: 24px 24px 64px;
  }
}
</style>
