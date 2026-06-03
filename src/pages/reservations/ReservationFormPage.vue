<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'
import BaseResourceSelect from '../../components/base/BaseResourceSelect.vue'

const paymentOptions = [
  { label: 'Dinheiro',           value: 'CASH' },
  { label: 'Cartão de crédito',  value: 'CREDIT' },
  { label: 'Cartão de débito',   value: 'DEBIT' },
  { label: 'PIX',                value: 'PIX' },
]

const statusOptions = [
  { label: 'Pendente',     value: 'PENDING' },
  { label: 'Confirmada',   value: 'CONFIRMED' },
  { label: 'Check-in',     value: 'CHECKED_IN' },
  { label: 'Check-out',    value: 'CHECKED_OUT' },
  { label: 'Cancelada',    value: 'CANCELED' },
]
</script>

<template>
  <BaseForm
    title="Reserva"
    resource="reservations"
    list-route-name="reservations-list"
    :initial="{ guest: null, room: null, employee: null, check_in: '', check_out: '', guests_count: 1, payment_method: 'PIX', status: 'PENDING', notes: '', total: 0 }"
  >
    <template #default="{ form, submit, loading, isEdit }">
      <q-form @submit.prevent="() => submit(form)" class="q-gutter-md">
        <BaseResourceSelect v-model="form.guest" resource="guests" option-label="last_name" label="Hóspede" />
        <BaseResourceSelect v-model="form.room" resource="rooms" option-label="number" label="Quarto" />
        <BaseResourceSelect v-model="form.employee" resource="employees" option-label="last_name" label="Funcionário (opcional)" />
        <q-input v-model="form.check_in" type="date" label="Check-in" filled />
        <q-input v-model="form.check_out" type="date" label="Check-out" filled />
        <q-input v-model.number="form.guests_count" type="number" label="Nº de hóspedes" filled />
        <q-select v-model="form.payment_method" :options="paymentOptions" emit-value map-options label="Pagamento" filled />
        <q-select v-model="form.status" :options="statusOptions" emit-value map-options label="Status" filled />
        <q-input v-model="form.notes" type="textarea" label="Observações" filled />
        <q-input v-model.number="form.total" type="number" label="Total" filled readonly />
        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'reservations-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>
