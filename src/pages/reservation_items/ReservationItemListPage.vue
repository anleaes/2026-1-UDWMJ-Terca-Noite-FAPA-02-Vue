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
          <p>Reserva: #{{ entity.reservation }}</p>
          <p>Preço unit.: R$ {{ entity.unit_price }} · Subtotal: R$ {{ entity.subtotal }}</p>
          <p>
            Data:
            <time :datetime="entity.service_date">{{ entity.service_date }}</time>
          </p>
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
