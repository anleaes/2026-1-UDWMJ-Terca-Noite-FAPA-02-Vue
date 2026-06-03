<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Propriedades"
    resource="properties"
    item-label="propriedade"
    add-route-name="properties-add"
    edit-route-name="properties-edit"
    :filter="p => p.is_active !== false"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard :image-url="entity.photo">
        <template #title>{{ entity.name }}</template>
        <template #meta>
          <div>{{ entity.property_type }} · ★ {{ entity.rating }}</div>
          <div>{{ entity.address }}</div>
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
