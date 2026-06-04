<script setup>
import { ref } from 'vue'
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import BaseStatusBadge from '../../components/base/BaseStatusBadge.vue'
import { useAuth } from '../../composables/useAuth'
import { useNotify } from '../../composables/useNotify'
import BackendManager from '../../api/BackendManager'

const { isEmployee } = useAuth()
const notify = useNotify()
const listKey = ref(0)

async function confirmReservation(id) {
  try {
    await BackendManager.post(`/reservations/confirmar/${id}/`)
    notify.success('Reserva confirmada')
    listKey.value++
  } catch {
    notify.error('Falha ao confirmar')
  }
}
</script>

<template>
  <BaseList
    :key="listKey"
    title="Reservas"
    resource="reservations"
    item-label="reserva"
    add-route-name="reservations-add"
    edit-route-name="reservations-edit"
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard>
        <template #title>
          Reserva #{{ entity.id }}
          <BaseStatusBadge :status="entity.status" />
        </template>
        <template #meta>
          <div>Hóspede: {{ entity.guest_name || entity.guest }}</div>
          <div>Quarto: {{ entity.room_label || entity.room }}</div>
          <div>
            {{ entity.check_in }} → {{ entity.check_out }} · {{ entity.guests_count }} hóspede(s)
          </div>
          <div>Pagamento: {{ entity.payment_method }} · Total: R$ {{ entity.total }}</div>
        </template>
        <template #actions>
          <component
            :is="Actions"
            :entity-id="entity.id"
            :edit-route-name="editRouteName"
            @delete="askDelete"
          >
            <template #before>
              <q-btn
                v-if="isEmployee && entity.status === 'PENDING'"
                color="primary"
                label="Confirmar"
                @click="confirmReservation(entity.id)"
              />
            </template>
          </component>
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
