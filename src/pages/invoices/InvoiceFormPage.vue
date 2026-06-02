<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const initial = {
  number: '',
  amount: '',
  document_pdf: null,
}
</script>

<template>
  <BaseForm title="Fatura" resource="invoices" list-route-name="invoices-list" :initial="initial">
    <template #default="{ form, submit, loading, isEdit }">
      <q-form class="q-gutter-md" @submit.prevent="submit(form)">
        <q-input v-model="form.number" filled label="Número" required />

        <q-input v-model="form.amount" filled label="Valor" type="number" required />

        <q-file v-model="form.document_pdf" filled label="PDF da fatura" accept="application/pdf" />

        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'invoices-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>