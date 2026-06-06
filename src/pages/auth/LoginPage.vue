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
  <div class="login-wrapper">
    <div class="login-box">
      <h1 class="text-h4 q-mb-lg text-white">Login</h1>
      <q-card class="q-pa-lg" style="max-width: 480px; width: 100%; min-width: 380px">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input v-model="username" label="Usuário" filled required />
          <q-input v-model="password" label="Senha" type="password" filled required />
          <q-btn type="submit" color="primary" label="Entrar" :loading="loading" />
        </q-form>
      </q-card>
      <p class="q-mt-md text-white">
        Não tem conta?
        <router-link to="/register" class="text-white">Cadastre-se</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image:
    linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(41, 41, 41, 0.68), rgba(0, 0, 0, 0.18)),
    url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80');
  background-size: cover;
  background-position: center;
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
