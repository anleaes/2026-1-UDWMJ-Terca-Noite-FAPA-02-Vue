<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { user, isAuthenticated, isEmployee, logout } = useAuth()

const expanded = ref(false)
function toggle() {
  expanded.value = !expanded.value
}
function close() {
  expanded.value = false
}

const publicLinks = [
  { to: '/', label: 'Início' },
  { to: '/properties', label: 'Propriedades' },
  { to: '/rooms', label: 'Quartos' },
  { to: '/services', label: 'Serviços' },
  { to: '/reviews', label: 'Avaliações' },
]
const authLinks = [{ to: '/reservations', label: 'Reservas' }]
const adminLinks = [
  { to: '/guests', label: 'Hóspedes' },
  { to: '/employees', label: 'Funcionários' },
  { to: '/room-types', label: 'Tipos de Quarto' },
  { to: '/amenities', label: 'Comodidades' },
  { to: '/service-categories', label: 'Categorias' },
  { to: '/reservation-items', label: 'Itens de Reserva' },
  { to: '/invoices', label: 'Faturas' },
]

function onLogout() {
  close()
  logout()
  router.push('/login')
}
</script>

<template>
  <q-toolbar>
    <q-toolbar-title>
      <router-link to="/" class="text-white" style="text-decoration: none; font-weight: 700">
        Host Flow
      </router-link>
    </q-toolbar-title>
    <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggle" />
  </q-toolbar>

  <q-slide-transition>
    <div v-show="expanded" class="bg-dark text-white q-px-md q-pb-md nav-panel">
      <q-list dark>
        <q-item v-for="l in publicLinks" :key="l.to" clickable :to="l.to" @click="close">
          <q-item-section>{{ l.label }}</q-item-section>
        </q-item>
        <template v-if="isAuthenticated">
          <q-item v-for="l in authLinks" :key="l.to" clickable :to="l.to" @click="close">
            <q-item-section>{{ l.label }}</q-item-section>
          </q-item>
        </template>
        <template v-if="isEmployee">
          <q-separator dark />
          <q-item-label header class="text-grey-5">Admin</q-item-label>
          <q-item v-for="l in adminLinks" :key="l.to" clickable :to="l.to" @click="close">
            <q-item-section>{{ l.label }}</q-item-section>
          </q-item>
        </template>
        <q-separator dark />
        <template v-if="isAuthenticated">
          <q-item clickable to="/profile" @click="close">
            <q-item-section>{{ user?.username }}</q-item-section>
          </q-item>
          <q-item clickable @click="onLogout">
            <q-item-section>Sair</q-item-section>
          </q-item>
        </template>
        <template v-else>
          <q-item clickable to="/login" @click="close">
            <q-item-section>Login</q-item-section>
          </q-item>
          <q-item clickable to="/register" @click="close">
            <q-item-section>Cadastrar</q-item-section>
          </q-item>
        </template>
      </q-list>
    </div>
  </q-slide-transition>
</template>

<style scoped>
.nav-panel {
  max-height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
