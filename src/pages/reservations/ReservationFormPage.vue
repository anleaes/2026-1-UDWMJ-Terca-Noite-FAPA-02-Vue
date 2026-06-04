<script setup>
import { ref } from 'vue'
import { useCrud } from '../../composables/useCrud'
import { useNotify } from '../../composables/useNotify'
import { validateBooking, nightsBetween } from '../../composables/useBookingValidation'
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'
import BaseResourceSelect from '../../components/base/BaseResourceSelect.vue'

const notify = useNotify()
const roomsApi = useCrud('rooms')
const dailyRate = ref(0)

const paymentOptions = [
  { label: 'Dinheiro', value: 'CASH' },
  { label: 'Cartão de crédito', value: 'CREDIT' },
  { label: 'Cartão de débito', value: 'DEBIT' },
  { label: 'PIX', value: 'PIX' },
]

const statusOptions = [
  { label: 'Pendente', value: 'PENDING' },
  { label: 'Confirmada', value: 'CONFIRMED' },
  { label: 'Check-in', value: 'CHECKED_IN' },
  { label: 'Check-out', value: 'CHECKED_OUT' },
  { label: 'Cancelada', value: 'CANCELED' },
]

async function onRoomChange(roomId, form) {
  if (!roomId) {
    dailyRate.value = 0
    form.total = 0
    return
  }
  const room = await roomsApi.getOne(roomId)
  dailyRate.value = room.daily_rate || 0
  form.total = nightsBetween(form.check_in, form.check_out) * dailyRate.value
}

function recomputeTotal(form) {
  form.total = nightsBetween(form.check_in, form.check_out) * dailyRate.value
}

function onSubmit(submit, form) {
  const err = validateBooking(form)
  if (err) {
    notify.error(err)
    return
  }
  submit(form)
}
</script>

<template>
  <BaseForm
    title="Reserva"
    resource="reservations"
    list-route-name="reservations-list"
    :initial="{
      guest: null,
      room: null,
      employee: null,
      check_in: '',
      check_out: '',
      guests_count: 1,
      payment_method: 'PIX',
      status: 'PENDING',
      notes: '',
      total: 0,
    }"
  >
    <template #default="{ form, submit, loading, isEdit }">
      <q-form @submit.prevent="onSubmit(submit, form)" class="q-gutter-md">
        <BaseResourceSelect
          v-model="form.guest"
          resource="guests"
          option-label="last_name"
          label="Hóspede"
        />
        <BaseResourceSelect
          v-model="form.room"
          resource="rooms"
          option-label="number"
          label="Quarto"
          @update:model-value="(v) => onRoomChange(v, form)"
        />
        <BaseResourceSelect
          v-model="form.employee"
          resource="employees"
          option-label="last_name"
          label="Funcionário (opcional)"
        />
        <q-input
          v-model="form.check_in"
          type="date"
          label="Check-in"
          filled
          @update:model-value="() => recomputeTotal(form)"
        />
        <q-input
          v-model="form.check_out"
          type="date"
          label="Check-out"
          filled
          @update:model-value="() => recomputeTotal(form)"
        />
        <q-input v-model.number="form.guests_count" type="number" label="Nº de hóspedes" filled />
        <q-select
          v-model="form.payment_method"
          :options="paymentOptions"
          emit-value
          map-options
          label="Pagamento"
          filled
        />
        <q-select
          v-model="form.status"
          :options="statusOptions"
          emit-value
          map-options
          label="Status"
          filled
        />
        <q-input v-model="form.notes" type="textarea" label="Observações" filled />
        <q-input v-model.number="form.total" type="number" label="Total" filled readonly />
        <BaseFormActions
          :loading="loading"
          :is-edit="isEdit"
          :cancel-to="{ name: 'reservations-list' }"
        />
      </q-form>
    </template>
  </BaseForm>
</template>
