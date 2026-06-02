<script setup>
import { computed, onMounted } from 'vue'
import { useCrud } from '../composables/useCrud'
import BaseCard from '../components/base/BaseCard.vue'

const { items, list } = useCrud('properties')
const featured = computed(() =>
  items.value.filter(p => p.is_active !== false).slice(0, 6)
)
onMounted(() => list({ ordering: '-rating' }))
</script>

<template>
  <section class="q-mb-xl">
    <h1 class="text-h3">Bem-vindo ao Host Flow</h1>
    <p class="text-grey-7">Encontre o lugar perfeito para sua estadia.</p>
  </section>
  <section>
    <h2 class="text-h5 q-mb-md">Propriedades em destaque</h2>
    <div class="row q-col-gutter-md">
      <div v-for="p in featured" :key="p.id" class="col-12 col-sm-6 col-md-4">
        <BaseCard :image-url="p.photo">
          <template #title>{{ p.name }}</template>
          <template #meta>
            <div>★ {{ p.rating }}</div>
            <div>{{ p.address }}</div>
          </template>
          <template #actions>
            <q-btn flat color="primary" label="Ver detalhes" :to="{ name: 'properties-detail', params: { id: p.id } }" />
            <q-btn flat color="secondary" label="Ver todas" :to="{ name: 'properties-list' }" />
          </template>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
