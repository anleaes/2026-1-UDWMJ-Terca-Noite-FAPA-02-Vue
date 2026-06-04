<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Itens de Reserva"
    resource="reservation_items"
    item-label="item de reserva"
    add-route-name="reservation_items-add"
    edit-route-name="reservation_items-edit"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard>
        <template #title>
          {{ entity.service?.name || entity.service }} x{{ entity.quantity }}
        </template>
        <template #meta>
          <div>Reserva: #{{ entity.reservation }}</div>
          <div>Preço unit.: R$ {{ entity.unit_price }} · Subtotal: R$ {{ entity.subtotal }}</div>
          <div>Data: {{ entity.service_date }}</div>
        </template>
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
