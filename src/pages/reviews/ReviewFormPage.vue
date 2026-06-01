<script setup>
import BaseForm from '../../components/base/BaseForm.vue'
import BaseFormActions from '../../components/base/BaseFormActions.vue'
import BaseResourceSelect from '../../components/base/BaseResourceSelect.vue'

const initial = {
  reservation: null,
  rating: 5,
  comment: '',
  photo: null,
}

const ratingOptions = [1, 2, 3, 4, 5].map((value) => ({ label: String(value), value }))
</script>

<template>
  <BaseForm title="Avaliação" resource="reviews" list-route-name="reviews-list" :initial="initial">
    <template #default="{ form, submit, loading, isEdit }">
      <q-form class="q-gutter-md" @submit.prevent="submit(form)">
        <BaseResourceSelect v-model="form.reservation" resource="reservations" label="Reserva" />

        <q-select
          v-model="form.rating"
          filled
          emit-value
          map-options
          :options="ratingOptions"
          label="Nota"
          required
        />

        <q-input v-model="form.comment" type="textarea" filled autogrow label="Comentário" />

        <q-file v-model="form.photo" filled label="Foto" accept="image/*" />

        <BaseFormActions :loading="loading" :is-edit="isEdit" :cancel-to="{ name: 'reviews-list' }" />
      </q-form>
    </template>
  </BaseForm>
</template>