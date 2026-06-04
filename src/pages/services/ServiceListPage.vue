<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Serviços"
    resource="services"
    item-label="serviço"
    add-route-name="services-add"
    edit-route-name="services-edit"
    search-placeholder="Buscar serviços..."
    :filter="(entity) => entity.is_active !== false"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard :image-url="entity.photo">
        <template #title>
          {{ entity.name }}
        </template>

        <template #meta>
          <div>{{ entity.category }} · R$ {{ entity.price }}</div>
        </template>

        <template #description>
          <div>{{ entity.description }}</div>
        </template>

        <template #actions>
          <Actions :entity-id="entity.id" :edit-route-name="editRouteName" @delete="askDelete" />
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
