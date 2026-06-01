<script setup>
import { computed } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  isEdit: { type: Boolean, default: false },
  cancelTo: { type: [String, Object], required: true },
  submitLabel: { type: String, default: null },
})

const label = computed(() => props.submitLabel ?? (props.isEdit ? 'Salvar' : 'Criar'))
</script>

<template>
  <div class="q-gutter-sm">
    <q-btn type="submit" color="primary" :label="label" :loading="loading" />
    <q-btn flat :to="cancelTo" label="Cancelar" />
  </div>
</template>
