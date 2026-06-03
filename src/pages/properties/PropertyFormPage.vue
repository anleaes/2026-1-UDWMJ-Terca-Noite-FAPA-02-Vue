<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const propertyTypes = [
  { label: 'Hotel',   value: 'HOTEL' },
  { label: 'Pousada', value: 'POUSADA' },
  { label: 'Resort',  value: 'RESORT' },
  { label: 'Hostel',  value: 'HOSTEL' },
]
</script>

<template>
  <BaseForm
    title="Propriedade"
    resource="properties"
    list-route-name="properties-list"
    :initial="{ name: '', description: '', address: '', property_type: '', rating: 0, photo: null, is_active: true }"
  >
    <template #default="{ form, submit, loading, isEdit }">
      <q-form @submit.prevent="() => submit(form)" class="q-gutter-md">
        <q-input v-model="form.name" label="Nome" filled required />
        <q-input v-model="form.description" type="textarea" label="Descrição" filled />
        <q-input v-model="form.address" label="Endereço" filled />
        <q-select v-model="form.property_type" :options="propertyTypes" emit-value map-options label="Tipo" filled />
        <q-input v-model.number="form.rating" type="number" label="Avaliação (0-5)" filled />
        <q-file v-model="form.photo" label="Foto" filled />
        <q-checkbox v-model="form.is_active" label="Ativo" />
        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'properties-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>
