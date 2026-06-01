<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ mode: { type: String, default: 'header' } })
defineEmits(['toggle-drawer'])

const isAuthenticated = computed(() => false)
const user = computed(() => null)
const isEmployee = computed(() => false)

const links = [
  { to: '/', label: 'Início' },
  { to: '/properties', label: 'Propriedades' },
  { to: '/reservations', label: 'Reservas', auth: true },
  { to: '/services', label: 'Serviços' },
  { to: '/reviews', label: 'Avaliações' },
  { to: '/employees', label: 'Funcionários', employee: true },
]

const router = useRouter()
</script>

<template>
  <q-toolbar v-if="mode === 'header'">
    <q-btn flat dense round icon="menu" class="lt-md" @click="$emit('toggle-drawer')" />
    <q-toolbar-title>
      <router-link to="/" class="text-white" style="text-decoration:none;font-weight:700">Host Flow</router-link>
    </q-toolbar-title>

    <div class="gt-sm row q-gutter-md items-center">
      <template v-for="l in links" :key="l.to">
        <router-link
          v-if="(!l.auth && !l.employee) || (l.auth && isAuthenticated) || (l.employee && isEmployee)"
          :to="l.to" class="text-white"
        >{{ l.label }}</router-link>
      </template>
      <router-link v-if="isAuthenticated" to="/profile" class="text-white">{{ user?.username }}</router-link>
      <q-btn v-if="isAuthenticated" flat dense label="Sair" @click="router.push('/login')" />
      <router-link v-else to="/login" class="text-white">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="text-white">Cadastrar</router-link>
    </div>
  </q-toolbar>

  <q-list v-else>
    <q-item v-for="l in links" :key="l.to" clickable :to="l.to">
      <q-item-section>{{ l.label }}</q-item-section>
    </q-item>
  </q-list>
</template>
