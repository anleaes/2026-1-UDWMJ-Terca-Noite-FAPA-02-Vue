<script setup>
import { onMounted } from 'vue'
import { useCrud } from '../../composables/useCrud'

const props = defineProps({
  modelValue: [Number, String, Object, Array, null],
  resource: { type: String, required: true },
  label: String,
  optionLabel: { type: String, default: 'name' },
  optionValue: { type: String, default: 'id' },
  multiple: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])

const { items, loading, list } = useCrud(props.resource)
onMounted(list)
</script>

<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :options="items"
    :option-label="optionLabel"
    :option-value="optionValue"
    :label="label"
    :loading="loading"
    :multiple="multiple"
    emit-value
    map-options
    filled
  />
</template>
