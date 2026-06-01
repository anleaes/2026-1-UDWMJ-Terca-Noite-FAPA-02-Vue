<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { request } from '../../api/http'

const form = ref({ username: '', password1: '', password2: '' })
const loading = ref(false)
const $q = useQuasar()
const router = useRouter()

async function onSubmit() {
  if (form.value.password1 !== form.value.password2) {
    $q.notify({ type: 'negative', message: 'Senhas não coincidem' }); return
  }
  loading.value = true
  try {
    const fd = new FormData()
    Object.entries(form.value).forEach(([k, v]) => fd.append(k, v))
    await request('POST', '/accounts/registrar/', { body: fd, isMultipart: true })
    $q.notify({ type: 'positive', message: 'Conta criada. Faça login.' })
    router.push('/login')
  } catch {
    $q.notify({ type: 'negative', message: 'Falha ao cadastrar' })
  } finally { loading.value = false }
}
</script>

<template>
  <h1 class="text-h4 q-mb-lg">Criar conta</h1>
  <q-card class="q-pa-lg" style="max-width:480px;">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input v-model="form.username" label="Usuário" filled required />
      <q-input v-model="form.password1" type="password" label="Senha" filled required />
      <q-input v-model="form.password2" type="password" label="Confirmar senha" filled required />
      <div class="q-gutter-sm">
        <q-btn type="submit" color="primary" label="Registrar" :loading="loading" />
        <q-btn flat to="/login" label="Já tenho conta" />
      </div>
    </q-form>
  </q-card>
</template>
