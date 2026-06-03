<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Comodidades"
    resource="amenities"
    item-label="comodidade"
    add-route-name="amenities-add"
    edit-route-name="amenities-edit"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard :image-url="entity.icon">
        <template #title>{{ entity.name }}</template>
        <template #meta>
          <div>Premium: {{ entity.is_premium ? 'Sim' : 'Não' }}</div>
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
