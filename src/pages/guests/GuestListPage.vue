<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Hóspedes"
    resource="guests"
    item-label="hóspede"
    add-route-name="guests-new"
    edit-route-name="guests-edit"
    search-placeholder="Buscar hóspedes..."
    :add-requires-employee="false"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard :image-url="entity.profile_photo">
        <template #title>{{ entity.first_name }} {{ entity.last_name }}</template>

        <template #meta>
          <div>Doc: {{ entity.document }} · {{ entity.gender }}</div>
          <div>{{ entity.email }} · {{ entity.phone }}</div>
        </template>

        <template #description>
          <div>Pontos: {{ entity.loyalty_points }}</div>
        </template>

        <template #actions>
          <Actions :entity-id="entity.id" :edit-route-name="editRouteName" @delete="askDelete" />
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
