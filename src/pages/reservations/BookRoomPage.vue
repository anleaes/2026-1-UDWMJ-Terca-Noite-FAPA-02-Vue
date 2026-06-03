<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrud } from '../../composables/useCrud'
import { useAuth } from '../../composables/useAuth'
import { useNotify } from '../../composables/useNotify'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const route = useRoute()
const router = useRouter()
const notify = useNotify()
const { user, loadMe } = useAuth()
const roomsApi = useCrud('rooms')
const reservationsApi = useCrud('reservations')
const room = ref(null)
const form = ref({
  check_in: '', check_out: '', guests_count: 1,
  payment_method: 'PIX', notes: '',
})
const totalEstimado = computed(() => {
  if (!room.value || !form.value.check_in || !form.value.check_out) return 0
  const nights = (new Date(form.value.check_out) - new Date(form.value.check_in)) / 86400000
  return nights > 0 ? nights * room.value.daily_rate : 0
})

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
  if (new Date(form.value.check_out) <= new Date(form.value.check_in)) {
    notify.error('A data de check-out precisa ser depois do check-in.'); return
  }
  try {
    await reservationsApi.create({ room: room.value.id, ...form.value })
    notify.success('Reserva criada')
    router.push({ name: 'properties-detail', params: { id: room.value.property } })
  } catch (e) {
    notify.error(e?.data?.non_field_errors?.[0] || 'Falha ao reservar (datas podem estar conflitando com outra reserva)')
  }
}
</script>

<template>
  <h1 class="text-h4 q-mb-lg">Reservar Quarto</h1>
  <q-card v-if="room" class="q-mb-md">
    <q-img v-if="room.photo" :src="room.photo" style="height:200px" />
    <q-card-section>
      <div class="text-h6">Quarto {{ room.number }}</div>
      <div class="text-grey-7">Diária: R$ {{ room.daily_rate }}</div>
      <div>{{ room.description }}</div>
    </q-card-section>
  </q-card>

  <q-card v-if="room" class="q-pa-lg">
    <q-form @submit.prevent="submit" class="q-gutter-md">
      <q-input v-model="form.check_in" type="date" label="Check-in" filled />
      <q-input v-model="form.check_out" type="date" label="Check-out" filled />
      <q-input v-model.number="form.guests_count" type="number" label="Nº de hóspedes" filled />
      <q-select v-model="form.payment_method"
                :options="[{value:'CASH',label:'Dinheiro'},{value:'CREDIT',label:'Cartão de crédito'},{value:'DEBIT',label:'Cartão de débito'},{value:'PIX',label:'PIX'}]"
                emit-value map-options label="Pagamento" filled />
      <q-input v-model="form.notes" type="textarea" label="Observações" filled />
      <div class="text-subtitle1">Total estimado: R$ {{ totalEstimado.toFixed(2) }}</div>
      <BaseFormActions submit-label="Reservar"
                       :cancel-to="{ name: 'properties-detail', params: { id: room?.property } }" />
    </q-form>
  </q-card>
</template>
