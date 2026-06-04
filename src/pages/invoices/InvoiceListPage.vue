<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Faturas"
    resource="invoices"
    item-label="fatura"
    add-route-name="invoices-add"
    edit-route-name="invoices-edit"
    search-placeholder="Buscar faturas..."
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard>
        <template #title>
          {{ entity.number }}
        </template>

        <template #meta>
          <p>Reserva: {{ entity.reservation }}</p>
          <p>
            Emissão:
            <time :datetime="entity.issue_date">{{ entity.issue_date }}</time>
            · Valor: R$ {{ entity.amount }}
          </p>
        </template>

        <template #description>
          <q-btn
            flat
            no-caps
            color="primary"
            :href="entity.document_pdf"
            target="_blank"
            label="Abrir PDF"
          />
        </template>

        <template #actions>
          <Actions :entity-id="entity.id" :edit-route-name="editRouteName" @delete="askDelete" />
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
