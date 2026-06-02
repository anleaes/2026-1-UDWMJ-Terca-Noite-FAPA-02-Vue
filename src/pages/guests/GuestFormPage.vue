<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'

const initial = {
  first_name: '',
  last_name: '',
  address: '',
  phone: '',
  email: '',
  document: '',
  gender: 'M',
  birth_date: '',
  profile_photo: null,
}

const genderOptions = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' },
  { label: 'Outro', value: 'O' },
]
</script>

<template>
  <BaseForm title="Hóspede" resource="guests" list-route-name="guests-list" :initial="initial">
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
          <q-input v-model="form.document" class="col-12 col-md-6" filled label="Documento" required />
          <q-select
            v-model="form.gender"
            class="col-12 col-md-6"
            filled
            emit-value
            map-options
            :options="genderOptions"
            label="Gênero"
            required
          />
        </div>

        <q-input v-model="form.birth_date" filled label="Data de nascimento" readonly required>
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.birth_date" mask="YYYY-MM-DD" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-file v-model="form.profile_photo" filled label="Foto do perfil" accept="image/*" />

        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'guests-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>