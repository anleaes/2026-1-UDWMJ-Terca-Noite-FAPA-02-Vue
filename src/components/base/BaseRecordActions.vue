<script setup>
import { computed } from 'vue'
import { useAuth } from '../../composables/useAuth'

const props = defineProps({
  entityId: { type: [Number, String], required: true },
  editRouteName: { type: String, required: true },
  requiresEmployee: { type: Boolean, default: true },
})
defineEmits(['delete'])

const { isAuthenticated, isEmployee } = useAuth()
const canManage = computed(
  () => isAuthenticated.value && (!props.requiresEmployee || isEmployee.value)
)
</script>

<template>
  <slot name="before" />
  <template v-if="canManage">
    <q-btn flat dense label="Editar" :to="{ name: editRouteName, params: { id: entityId } }" />
    <q-btn flat dense color="negative" label="Excluir" @click="$emit('delete', entityId)" />
  </template>
</template>
