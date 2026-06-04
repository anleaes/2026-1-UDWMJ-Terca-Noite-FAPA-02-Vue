<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Categorias de Serviço"
    resource="service_categories"
    item-label="categoria"
    add-route-name="service_categories-add"
    edit-route-name="service_categories-edit"
    search-placeholder="Buscar categorias..."
    :filter="(entity) => entity.is_active !== false"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard>
        <template #title>
          {{ entity.name }}
        </template>

        <template #meta>
          <div>Ativa: {{ entity.is_active ? 'Sim' : 'Não' }}</div>
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
