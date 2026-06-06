<script setup>
import { HERO_IMAGE } from '../../constants/home'

defineProps({
  properties: { type: Array, required: true },
})

defineEmits(['select'])
</script>

<template>
  <section class="home-section">
    <div class="home-container">
      <div class="section-heading">
        <div>
          <h2>Hospedagens em destaque</h2>
          <p>Algumas opcoes cadastradas no Host Flow para voce conhecer.</p>
        </div>
        <q-btn flat color="grey-10" icon-right="arrow_forward" label="Ver todas" @click="$emit('select')" />
      </div>

      <div v-if="properties.length" class="row q-col-gutter-lg">
        <div v-for="property in properties" :key="property.id" class="col-12 col-sm-6 col-md-3">
          <q-card class="property-card cursor-pointer" flat bordered @click="$emit('select', property)">
            <q-img :src="property.photo || HERO_IMAGE" height="170px" />
            <q-card-section>
              <div class="property-title">{{ property.name }}</div>
              <div class="property-meta">
                <q-icon name="star" color="grey-9" />
                <span>{{ property.rating || 'Novo' }}</span>
              </div>
              <div class="property-address">{{ property.address || 'Brasil' }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-banner v-else rounded class="empty-featured">
        <template #avatar>
          <q-icon name="travel_explore" color="grey-10" size="34px" />
        </template>
        As hospedagens cadastradas aparecem aqui quando a API estiver disponivel.
      </q-banner>
    </div>
  </section>
</template>

<style scoped>
.property-card {
  height: 100%;
  background: var(--color-bg-surface);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
}

.property-title {
  min-height: 48px;
  font-weight: 800;
  font-size: 1.05rem;
  line-height: 1.25;
}

.property-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  font-weight: 700;
}

.property-address {
  margin-top: 6px;
  font-size: 0.9rem;
  line-height: 1.35;
  color: var(--color-text-muted);
}

.empty-featured {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-soft);
}
</style>
