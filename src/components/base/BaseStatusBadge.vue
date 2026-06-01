<script setup>
defineProps({ status: String, label: String })

const palette = {
  PENDING:     { color: 'warning' },
  CONFIRMED:   { color: 'positive' },
  CHECKED_IN:  { color: 'primary' },
  CHECKED_OUT: { color: 'grey-7' },
  CANCELED:    { color: 'negative' },
}
</script>

<template>
  <q-badge :color="palette[status]?.color || 'grey'" :label="label || status" />
</template>
