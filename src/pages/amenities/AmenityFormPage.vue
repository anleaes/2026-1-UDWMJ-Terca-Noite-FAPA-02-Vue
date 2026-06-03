<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'
</script>

<template>
  <BaseForm
    title="Comodidade"
    resource="amenities"
    list-route-name="amenities-list"
    :initial="{ name: '', description: '', is_premium: false, icon: null }"
  >
    <template #default="{ form, submit, loading, isEdit }">
      <q-form @submit.prevent="() => submit(form)" class="q-gutter-md">
        <q-input v-model="form.name" label="Nome" filled required />
        <q-input v-model="form.description" type="textarea" label="Descrição" filled />
        <q-checkbox v-model="form.is_premium" label="Premium" />
        <q-file v-model="form.icon" label="Ícone" filled />
        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'amenities-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>
