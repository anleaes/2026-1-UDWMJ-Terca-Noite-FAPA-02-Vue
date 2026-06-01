<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Avaliações"
    resource="reviews"
    item-label="avaliação"
    add-route-name="reviews-add"
    edit-route-name="reviews-edit"
    search-placeholder="Buscar avaliações..."
    :add-requires-employee="false"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard :image-url="entity.photo">
        <template #title>
          <q-rating :model-value="entity.rating" readonly size="18px" color="amber" />
        </template>

        <template #meta>
          <div>Reserva #{{ entity.reservation }} · {{ entity.created_at }}</div>
        </template>

        <template #description>
          <div>{{ entity.comment }}</div>
        </template>

        <template #actions>
          <Actions :entity-id="entity.id" :edit-route-name="editRouteName" @delete="askDelete">
            <template #before>
              <q-badge color="primary" outline class="q-mr-sm">{{ entity.rating }}/5</q-badge>
            </template>
          </Actions>
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>