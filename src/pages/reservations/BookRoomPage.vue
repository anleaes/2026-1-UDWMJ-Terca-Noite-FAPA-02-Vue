<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrud } from '../../composables/useCrud'
import { useAuth } from '../../composables/useAuth'
import { useNotify } from '../../composables/useNotify'
import { useBookingValidation } from '../../composables/useBookingValidation'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const route = useRoute()
const router = useRouter()
const notify = useNotify()
const { user, loadMe } = useAuth()
const roomsApi = useCrud('rooms')
const reservationsApi = useCrud('reservations')
const room = ref(null)
const form = ref({
  check_in: '',
  check_out: '',
  guests_count: 1,
  payment_method: 'PIX',
  notes: '',
})

const dailyRate = computed(() => room.value?.daily_rate)
const { total, validate } = useBookingValidation(form, dailyRate)

onMounted(async () => {
  await loadMe()
  if (!user.value?.is_guest) {
    notify.info('Crie seu perfil de hóspede antes de reservar.')
    router.replace({ name: 'guests-add', query: { next: route.fullPath } })
    return
  }
  room.value = await roomsApi.getOne(route.params.id_room)
})

async function submit() {
  const err = validate()
  if (err) {
    notify.error(err)
    return
  }
  try {
    await reservationsApi.create({ room: room.value.id, ...form.value })
    notify.success('Reserva criada')
    router.push({ name: 'properties-detail', params: { id: room.value.property } })
  } catch (e) {
    notify.error(
      e?.data?.non_field_errors?.[0] ||
        'Falha ao reservar (datas podem estar conflitando com outra reserva)'
    )
  }
}
</script>

<template>
  <h1 class="text-h4 q-mb-lg">Reservar Quarto</h1>
  <q-card v-if="room" class="q-mb-md">
    <q-img v-if="room.photo" :src="room.photo" style="height: 200px" />
    <q-card-section>
      <h2 class="text-h6 q-mb-none">Quarto {{ room.number }}</h2>
      <p class="text-grey-7 q-mb-sm">Diária: R$ {{ room.daily_rate }}</p>
      <p>{{ room.description }}</p>
    </q-card-section>
  </q-card>

  <q-card v-if="room" class="q-pa-lg">
    <q-form @submit.prevent="submit" class="q-gutter-md">
      <q-input v-model="form.check_in" type="date" label="Check-in" filled />
      <q-input v-model="form.check_out" type="date" label="Check-out" filled />
      <q-input v-model.number="form.guests_count" type="number" label="Nº de hóspedes" filled />
      <q-select
        v-model="form.payment_method"
        :options="[
          { value: 'CASH', label: 'Dinheiro' },
          { value: 'CREDIT', label: 'Cartão de crédito' },
          { value: 'DEBIT', label: 'Cartão de débito' },
          { value: 'PIX', label: 'PIX' },
        ]"
        emit-value
        map-options
        label="Pagamento"
        filled
      />
      <q-input v-model="form.notes" type="textarea" label="Observações" filled />
      <output class="text-subtitle1 block">Total estimado: R$ {{ total.toFixed(2) }}</output>
      <BaseFormActions
        submit-label="Reservar"
        :cancel-to="{ name: 'properties-detail', params: { id: room?.property } }"
      />
    </q-form>
  </q-card>
</template>
