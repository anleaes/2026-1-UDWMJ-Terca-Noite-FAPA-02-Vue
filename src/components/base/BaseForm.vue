<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCrud } from '../../composables/useCrud'
import { useNotify } from '../../composables/useNotify'

const props = defineProps({
  title: { type: String, required: true },
  resource: { type: String, required: true },
  listRouteName: { type: String, required: true },
  initial: { type: Object, default: () => ({}) },
})

const router = useRouter()
const route = useRoute()
const notify = useNotify()
const { getOne, create, update } = useCrud(props.resource)
const form = ref({ ...props.initial })
const isEdit = !!route.params.id
const loading = ref(false)

onMounted(async () => {
  if (isEdit) {
    const data = await getOne(route.params.id)
    form.value = { ...props.initial, ...data }
  }
})

async function onSubmit(payload) {
  loading.value = true
  try {
    isEdit ? await update(route.params.id, payload) : await create(payload)
    notify.success('Salvo com sucesso')
    router.push({ name: props.listRouteName })
  } catch {
    notify.error('Falha ao salvar')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="form-wrapper">
    <h1 class="text-h4 q-mb-lg">{{ title }}</h1>
    <q-card class="q-pa-lg" style="max-width: 680px; width: 100%">
      <slot :form="form" :submit="onSubmit" :loading="loading" :is-edit="isEdit" />
    </q-card>
  </div>
</template>

<style scoped>
.form-wrapper {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
}
</style>
