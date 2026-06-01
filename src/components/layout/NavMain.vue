<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

defineProps({ mode: { type: String, default: 'header' } })
defineEmits(['toggle-drawer'])

const router = useRouter()
const { user, isAuthenticated, isEmployee, logout } = useAuth()

const publicLinks = [
  { to: '/',           label: 'Início' },
  { to: '/properties', label: 'Propriedades' },
  { to: '/rooms',      label: 'Quartos' },
  { to: '/services',   label: 'Serviços' },
  { to: '/reviews',    label: 'Avaliações' },
]
const authLinks = [
  { to: '/reservations', label: 'Reservas' },
]
const adminLinks = [
  { to: '/guests',             label: 'Hóspedes' },
  { to: '/employees',          label: 'Funcionários' },
  { to: '/room-types',         label: 'Tipos de Quarto' },
  { to: '/amenities',          label: 'Comodidades' },
  { to: '/service-categories', label: 'Categorias' },
  { to: '/reservation-items',  label: 'Itens de Reserva' },
  { to: '/invoices',           label: 'Faturas' },
]

function onLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <q-toolbar v-if="mode === 'header'">
    <q-btn flat dense round icon="menu" class="lt-md" @click="$emit('toggle-drawer')" />
    <q-toolbar-title>
      <router-link to="/" class="text-white" style="text-decoration:none;font-weight:700">Host Flow</router-link>
    </q-toolbar-title>

    <div class="gt-sm row q-gutter-md items-center">
      <router-link v-for="l in publicLinks" :key="l.to" :to="l.to" class="text-white">{{ l.label }}</router-link>
      <template v-if="isAuthenticated">
        <router-link v-for="l in authLinks" :key="l.to" :to="l.to" class="text-white">{{ l.label }}</router-link>
      </template>

      <q-btn-dropdown v-if="isEmployee" flat label="Admin" class="text-white">
        <q-list>
          <q-item v-for="l in adminLinks" :key="l.to" clickable v-close-popup :to="l.to">
            <q-item-section>{{ l.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <router-link v-if="isAuthenticated" to="/profile" class="text-white">{{ user?.username }}</router-link>
      <q-btn v-if="isAuthenticated" flat dense label="Sair" @click="onLogout" />
      <router-link v-else to="/login" class="text-white">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="text-white">Cadastrar</router-link>
    </div>
  </q-toolbar>

  <q-list v-else>
    <q-item v-for="l in publicLinks" :key="l.to" clickable :to="l.to">
      <q-item-section>{{ l.label }}</q-item-section>
    </q-item>
    <template v-if="isAuthenticated">
      <q-item v-for="l in authLinks" :key="l.to" clickable :to="l.to">
        <q-item-section>{{ l.label }}</q-item-section>
      </q-item>
    </template>
    <template v-if="isEmployee">
      <q-separator />
      <q-item-label header>Admin</q-item-label>
      <q-item v-for="l in adminLinks" :key="l.to" clickable :to="l.to">
        <q-item-section>{{ l.label }}</q-item-section>
      </q-item>
    </template>
  </q-list>
</template>
