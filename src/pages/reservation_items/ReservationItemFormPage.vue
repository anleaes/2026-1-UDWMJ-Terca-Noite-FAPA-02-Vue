<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrud } from '../../composables/useCrud'
import { useNotify } from '../../composables/useNotify'
import BaseResourceSelect from '../../components/base/BaseResourceSelect.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const route = useRoute()
const router = useRouter()
const notify = useNotify()
const { getOne, create, update } = useCrud('reservation_items')
const servicesApi = useCrud('services')

const isEdit = !!route.params.id
const loading = ref(false)
const form = ref({ reservation: null, service: null, quantity: 1, unit_price: 0, service_date: '' })

onMounted(async () => {
  if (isEdit) {
    const data = await getOne(route.params.id)
    form.value = { ...data }
    return
  }
  const serviceId = route.query.service
  if (serviceId) {
    const svc = await servicesApi.getOne(serviceId)
    form.value.service = svc.id
    form.value.unit_price = svc.price
  }
})

async function submit() {
  loading.value = true
  try {
    isEdit
      ? await update(route.params.id, form.value)
      : await create(form.value)
    notify.success('Salvo com sucesso')
    router.push({ name: 'reservation_items-list' })
  } catch {
    notify.error('Falha ao salvar')
  } finally { loading.value = false }
}
</script>

<template>
  <h1 class="text-h4 q-mb-lg">Item de Reserva</h1>
  <q-card class="q-pa-lg" style="max-width:680px;">
    <q-form @submit.prevent="submit" class="q-gutter-md">
      <BaseResourceSelect v-model="form.reservation" resource="reservations" option-label="id" label="Reserva" />
      <BaseResourceSelect v-model="form.service" resource="services" label="Serviço" />
      <q-input v-model.number="form.quantity" type="number" label="Quantidade" filled />
      <q-input v-model.number="form.unit_price" type="number" label="Preço unitário" filled />
      <q-input v-model="form.service_date" type="date" label="Data do serviço" filled />
      <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'reservation_items-list' }" />
    </q-form>
  </q-card>
</template>
