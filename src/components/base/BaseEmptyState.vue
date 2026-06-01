<script setup>
defineProps({ message: { type: String, default: 'Nada cadastrado.' } })
</script>

<template>
  <q-card flat bordered class="q-pa-xl text-center text-grey-7">
    {{ message }}
  </q-card>
</template>
