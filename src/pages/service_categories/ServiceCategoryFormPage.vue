<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const initial = {
  name: '',
  description: '',
  is_active: true,
  icon: null,
}
</script>

<template>
  <BaseForm
    title="Categoria de Serviço"
    resource="service_categories"
    list-route-name="service_categories-list"
    :initial="initial"
  >
    <template #default="{ form, submit, loading, isEdit }">
      <q-form class="q-gutter-md" @submit.prevent="submit(form)">
        <q-input v-model="form.name" filled label="Nome" required />

        <q-input v-model="form.description" type="textarea" filled autogrow label="Descrição" />

        <q-file v-model="form.icon" filled label="Ícone" />

        <q-checkbox v-model="form.is_active" label="Ativa" />

        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'service_categories-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>