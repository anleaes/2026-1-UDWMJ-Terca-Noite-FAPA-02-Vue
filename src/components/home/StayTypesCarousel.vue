<script setup>
import { ref } from 'vue'
import { STAY_TYPES } from '../../constants/home'

defineEmits(['select'])

const staySlide = ref(STAY_TYPES[0].id)
</script>

<template>
  <section class="home-section soft-section">
    <div class="home-container">
      <div class="section-heading">
        <div>
          <h2>Tipos de acomodacoes</h2>
          <p>Escolha o estilo de estadia que combina com sua viagem.</p>
        </div>
      </div>

      <q-carousel
        v-model="staySlide"
        animated
        arrows
        swipeable
        height="330px"
        class="stay-carousel lt-md"
      >
        <q-carousel-slide
          v-for="stay in STAY_TYPES"
          :key="stay.id"
          :name="stay.id"
          class="stay-slide"
          @click="$emit('select', stay)"
        >
          <q-img :src="stay.image" class="stay-slide-image" />
          <div class="stay-slide-content">
            <q-icon :name="stay.icon" size="32px" color="grey-10" />
            <h3>{{ stay.title }}</h3>
            <p>{{ stay.description }}</p>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row q-col-gutter-lg gt-sm">
        <div v-for="stay in STAY_TYPES" :key="stay.id" class="col-3">
          <q-card class="stay-card cursor-pointer" flat bordered @click="$emit('select', stay)">
            <q-img :src="stay.image" height="150px" />
            <q-card-section>
              <q-icon :name="stay.icon" size="30px" color="grey-10" />
              <h3>{{ stay.title }}</h3>
              <p>{{ stay.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.soft-section {
  background: var(--color-bg-surface);
}

.stay-carousel,
.stay-card {
  border-radius: 8px;
  overflow: hidden;
}

.stay-card {
  height: 100%;
  background: var(--color-bg-surface);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.stay-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
}

.stay-card p,
.stay-slide-content p {
  color: var(--color-text-muted);
}

.stay-card h3,
.stay-slide-content h3 {
  margin: 10px 0 6px;
  font-size: 1.2rem;
  font-weight: 800;
}

.stay-slide {
  padding: 0;
  background: var(--color-bg-surface);
}

.stay-slide-image {
  height: 190px;
}

.stay-slide-content {
  padding: 18px;
}
</style>
