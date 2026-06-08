<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import { STAY_TYPES } from '../../constants/home'

const route = useRoute()
const router = useRouter()

const typeFilter = computed(() => {
  const value = route.query.type
  if (!value) return null
  return STAY_TYPES.some((s) => s.id === value) ? value : null
})

const activeLabel = computed(() => STAY_TYPES.find((s) => s.id === typeFilter.value)?.title)

const filterFn = computed(() => (p) => {
  if (p.is_active === false) return false
  if (typeFilter.value && p.property_type !== typeFilter.value) return false
  return true
})

function clearTypeFilter() {
  router.replace({ name: 'properties-list', query: {} })
}
</script>

<template>
  <BaseList
    title="Propriedades"
    resource="properties"
    item-label="propriedade"
    add-route-name="properties-add"
    edit-route-name="properties-edit"
    :filter="filterFn"
  >
    <template #header v-if="typeFilter">
      <q-chip
        removable
        color="grey-3"
        text-color="grey-10"
        icon="filter_alt"
        @remove="clearTypeFilter"
      >
        {{ activeLabel }}
      </q-chip>
    </template>
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard :image-url="entity.photo">
        <template #title>{{ entity.name }}</template>
        <template #meta>
          <p>{{ entity.property_type }} · ★ {{ entity.rating }}</p>
          <address>{{ entity.address }}</address>
        </template>
        <template #description>{{ entity.description }}</template>
        <template #actions>
          <component
            :is="Actions"
            :entity-id="entity.id"
            :edit-route-name="editRouteName"
            @delete="askDelete"
          />
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
