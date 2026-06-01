<script setup>
defineProps({
  modelValue: Boolean,
  label: { type: String, default: 'este registro' },
})
const emit = defineEmits(['update:modelValue', 'confirm'])
function close() { emit('update:modelValue', false) }
function confirm() { emit('confirm'); close() }
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card>
      <q-card-section>Confirma exclusão de {{ label }}?</q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="close" />
        <q-btn color="negative" label="Excluir" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
