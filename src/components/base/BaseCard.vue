<script setup>
defineProps({
  imageUrl: String,
  showActions: { type: Boolean, default: true },
})
</script>

<template>
  <q-card class="full-height column">
    <q-img v-if="imageUrl" :src="imageUrl" style="height:180px" />
    <q-card-section class="col">
      <div class="text-h6 q-mb-sm"><slot name="title" /></div>
      <div class="text-grey-7 text-body2 q-gutter-y-xs">
        <slot name="meta" />
      </div>
      <div class="q-mt-sm"><slot name="description" /></div>
    </q-card-section>
    <q-card-actions v-if="showActions" align="right">
      <slot name="actions" />
    </q-card-actions>
  </q-card>
</template>
