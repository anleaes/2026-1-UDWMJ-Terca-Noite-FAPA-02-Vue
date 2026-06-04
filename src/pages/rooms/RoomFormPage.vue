<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'
import BaseResourceSelect from '../../components/base/BaseResourceSelect.vue'

const statusOptions = [
  { label: 'Disponível', value: 'AVAILABLE' },
  { label: 'Ocupado', value: 'OCCUPIED' },
  { label: 'Manutenção', value: 'MAINTENANCE' },
]
</script>

<template>
  <BaseForm
    title="Quarto"
    resource="rooms"
    list-route-name="rooms-list"
    :initial="{
      property: null,
      room_type: null,
      amenities: [],
      number: '',
      floor: 0,
      daily_rate: 0,
      status: 'AVAILABLE',
      description: '',
      is_active: true,
      photo: null,
    }"
  >
    <template #default="{ form, submit, loading, isEdit }">
      <q-form @submit.prevent="() => submit(form)" class="q-gutter-md">
        <BaseResourceSelect v-model="form.property" resource="properties" label="Propriedade" />
        <BaseResourceSelect v-model="form.room_type" resource="room_types" label="Tipo de Quarto" />
        <BaseResourceSelect
          v-model="form.amenities"
          resource="amenities"
          label="Comodidades"
          :multiple="true"
        />
        <q-input v-model="form.number" label="Número" filled required />
        <q-input v-model.number="form.floor" type="number" label="Andar" filled />
        <q-input v-model.number="form.daily_rate" type="number" label="Diária (R$)" filled />
        <q-select
          v-model="form.status"
          :options="statusOptions"
          emit-value
          map-options
          label="Status"
          filled
        />
        <q-input v-model="form.description" type="textarea" label="Descrição" filled />
        <q-checkbox v-model="form.is_active" label="Ativo" />
        <q-file v-model="form.photo" label="Foto" filled />
        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'rooms-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>
