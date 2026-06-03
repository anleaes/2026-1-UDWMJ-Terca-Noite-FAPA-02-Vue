<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Tipos de Quarto"
    resource="room_types"
    item-label="tipo de quarto"
    add-route-name="room_types-add"
    edit-route-name="room_types-edit"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard>
        <template #title>{{ entity.name }}</template>
        <template #meta>
          <div>Preço base: R$ {{ entity.base_price }} · Ocupação: {{ entity.max_occupancy }}</div>
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
