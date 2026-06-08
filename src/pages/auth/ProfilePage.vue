<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const { user, logout } = useAuth()
const router = useRouter()

function onLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="q-px-lg q-py-md">
    <h1 class="text-h4 q-mb-lg">Olá, {{ user?.username }}</h1>
    <p class="text-grey-7">E-mail: {{ user?.email || '(não informado)' }}</p>
    <q-btn outline label="Sair" @click="onLogout" />
  </div>
</template>
