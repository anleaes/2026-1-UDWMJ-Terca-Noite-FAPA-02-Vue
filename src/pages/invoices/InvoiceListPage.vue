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
          <div>Reserva: {{ entity.reservation }}</div>
          <div>Emissão: {{ entity.issue_date }} · Valor: R$ {{ entity.amount }}</div>
        </template>

        <template #description>
          <div>
            <q-btn
              flat
              no-caps
              color="primary"
              :href="entity.document_pdf"
              target="_blank"
              label="Abrir PDF"
            />
          </div>
        </template>

        <template #actions>
          <Actions :entity-id="entity.id" :edit-route-name="editRouteName" @delete="askDelete" />
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
