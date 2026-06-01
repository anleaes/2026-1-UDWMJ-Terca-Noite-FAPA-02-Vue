<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'
import BaseResourceSelect from '../../components/base/BaseResourceSelect.vue'
import { useNotify } from '../../composables/useNotify'

const notify = useNotify()

const initial = {
  name: '',
  category: null,
  new_category_name: '',
  new_category_description: '',
  price: '',
  description: '',
  is_active: true,
  photo: null,
}

function onSubmit(form, submit) {
  if (!form.category && !form.new_category_name?.trim()) {
    notify.error('Selecione uma categoria ou informe o nome de uma nova.')
    return
  }

  submit(form)
}
</script>

<template>
  <BaseForm title="Serviço" resource="services" list-route-name="services-list" :initial="initial">
    <template #default="{ form, submit, loading, isEdit }">
      <q-form class="q-gutter-md" @submit.prevent="onSubmit(form, submit)">
        <q-input v-model="form.name" filled label="Nome" required />

        <BaseResourceSelect v-model="form.category" resource="service_categories" label="Categoria" />

        <q-input v-model="form.new_category_name" filled label="Nova categoria (opcional)" />

        <q-input
          v-model="form.new_category_description"
          type="textarea"
          filled
          autogrow
          label="Descrição da nova categoria (opcional)"
        />

        <div class="row q-col-gutter-md">
          <q-input v-model="form.price" class="col-12 col-md-6" filled label="Preço" type="number" required />
        </div>

        <q-input v-model="form.description" type="textarea" filled autogrow label="Descrição" />

        <q-file v-model="form.photo" filled label="Foto do serviço" accept="image/*" />

        <q-checkbox v-model="form.is_active" label="Ativo" />

        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'services-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>