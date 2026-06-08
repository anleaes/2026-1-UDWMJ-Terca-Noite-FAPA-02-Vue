<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import AuthManager from '../../api/AuthManager'

const form = ref({ username: '', password1: '', password2: '' })
const loading = ref(false)
const $q = useQuasar()
const router = useRouter()

async function onSubmit() {
  if (form.value.password1 !== form.value.password2) {
    $q.notify({ type: 'negative', message: 'Senhas não coincidem' })
    return
  }
  loading.value = true
  try {
    await AuthManager.register(form.value)
    $q.notify({ type: 'positive', message: 'Conta criada. Faça login.' })
    router.push('/login')
  } catch {
    $q.notify({ type: 'negative', message: 'Falha ao cadastrar' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-wrapper">
    <div class="register-box">
      <h1 class="text-h4 q-mb-lg text-white">Criar conta</h1>
      <q-card class="q-pa-lg" style="max-width: 480px; width: 100%; min-width: 380px">
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
      <p class="q-mt-md text-white">
        Já tem conta?
        <router-link to="/login" class="text-white">Entrar</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
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

.register-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
