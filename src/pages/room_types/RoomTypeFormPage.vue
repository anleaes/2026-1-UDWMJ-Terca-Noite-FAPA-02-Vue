<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'
</script>

<template>
  <BaseForm
    title="Tipo de Quarto"
    resource="room_types"
    list-route-name="room_types-list"
    :initial="{ name: '', description: '', base_price: 0, max_occupancy: 1 }"
  >
    <template #default="{ form, submit, loading, isEdit }">
      <q-form @submit.prevent="() => submit(form)" class="q-gutter-md">
        <q-input v-model="form.name" label="Nome" filled required />
        <q-input v-model="form.description" type="textarea" label="Descrição" filled />
        <q-input v-model.number="form.base_price" type="number" label="Preço base" filled />
        <q-input v-model.number="form.max_occupancy" type="number" label="Ocupação máxima" filled />
        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'room_types-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>
