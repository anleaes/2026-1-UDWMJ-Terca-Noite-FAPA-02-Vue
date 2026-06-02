<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const initial = {
  first_name: '',
  last_name: '',
  address: '',
  phone: '',
  email: '',
  position: '',
  hired_date: '',
  salary: '',
  is_active: true,
  contract: null,
  username: '',
}
</script>

<template>
  <BaseForm title="Funcionário" resource="employees" list-route-name="employees-list" :initial="initial">
    <template #default="{ form, submit, loading, isEdit }">
      <q-form class="q-gutter-md" @submit.prevent="submit(form)">
        <div class="row q-col-gutter-md">
          <q-input v-model="form.first_name" class="col-12 col-md-6" filled label="Nome" required />
          <q-input v-model="form.last_name" class="col-12 col-md-6" filled label="Sobrenome" required />
        </div>

        <q-input v-model="form.address" filled label="Endereço" required />

        <div class="row q-col-gutter-md">
          <q-input v-model="form.phone" class="col-12 col-md-6" filled label="Telefone" required />
          <q-input v-model="form.email" class="col-12 col-md-6" filled label="E-mail" type="email" required />
        </div>

        <div class="row q-col-gutter-md">
          <q-input v-model="form.position" class="col-12 col-md-6" filled label="Cargo" required />
          <q-input v-model="form.salary" class="col-12 col-md-6" filled label="Salário" type="number" required />
        </div>

        <q-input v-model="form.hired_date" filled label="Data de contratação" readonly required>
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.hired_date" mask="YYYY-MM-DD" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-file v-model="form.contract" filled label="Contrato" />

        <q-input v-model="form.username" filled label="Usuário (opcional)" hint="Se preenchido, o backend cria um User vinculado." />

        <q-checkbox v-model="form.is_active" label="Ativo" />

        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'employees-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>