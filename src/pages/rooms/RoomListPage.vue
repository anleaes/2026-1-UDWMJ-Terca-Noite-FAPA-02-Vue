<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import { useRoomStatus } from '../../composables/useRoomStatus'

const { statusLabel } = useRoomStatus()
</script>

<template>
  <BaseList
    title="Quartos"
    resource="rooms"
    item-label="quarto"
    add-route-name="rooms-add"
    edit-route-name="rooms-edit"
    :filter="r => r.is_active !== false"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard :image-url="entity.photo">
        <template #title>Quarto #{{ entity.number }}</template>
        <template #meta>
          <div>Tipo: {{ entity.room_type }} · Diária: R$ {{ entity.daily_rate }}</div>
          <q-badge :color="statusLabel(entity).color" :label="statusLabel(entity).label" />
        </template>
        <template #description>{{ entity.description }}</template>
        <template #actions>
          <component
            :is="Actions"
            :entity-id="entity.id"
            :edit-route-name="editRouteName"
            @delete="askDelete"
          >
            <template #before>
              <q-btn v-if="entity.status === 'AVAILABLE'" color="primary"
                     :label="statusLabel(entity).action"
                     :to="{ name: 'reservations-book', params: { id_room: entity.id } }" />
            </template>
          </component>
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
