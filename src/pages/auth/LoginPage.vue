<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuth } from '../../composables/useAuth'

const username = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const { login, isEmployee } = useAuth()

async function onSubmit() {
  loading.value = true
  try {
    await login(username.value, password.value)
    router.push(route.query.next || (isEmployee.value ? '/reservations' : '/'))
  } catch {
    $q.notify({ type: 'negative', message: 'Usuário ou senha inválidos' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <h1 class="text-h4 q-mb-lg">Login</h1>
  <q-card class="q-pa-lg" style="max-width: 480px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input v-model="username" label="Usuário" filled required />
      <q-input v-model="password" label="Senha" type="password" filled required />
      <q-btn type="submit" color="primary" label="Entrar" :loading="loading" />
    </q-form>
  </q-card>
  <p class="q-mt-md text-grey-7">
    Não tem conta?
    <router-link to="/register">Cadastre-se</router-link>
  </p>
</template>
