<script setup>
defineProps({
  entityId: { type: [Number, String], required: true },
  editRouteName: { type: String, required: true },
})
defineEmits(['delete'])
</script>

<template>
  <slot name="before" />
  <q-btn flat dense label="Editar" :to="{ name: editRouteName, params: { id: entityId } }" />
  <q-btn flat dense color="negative" label="Excluir" @click="$emit('delete', entityId)" />
</template>
