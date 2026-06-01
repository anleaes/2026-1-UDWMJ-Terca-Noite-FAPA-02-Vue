<script setup>
import BaseList from '../../components/base/BaseList.vue'
import BaseCard from '../../components/base/BaseCard.vue'
</script>

<template>
  <BaseList
    title="Funcionários"
    resource="employees"
    item-label="funcionário"
    add-route-name="employees-add"
    edit-route-name="employees-edit"
    search-placeholder="Buscar funcionários..."
  >
    <template #card="{ entity, askDelete, editRouteName, Actions }">
      <BaseCard>
        <template #title>
          {{ entity.first_name }} {{ entity.last_name }}
        </template>

        <template #meta>
          <div>Cargo: {{ entity.position }} · Contratado em: {{ entity.hired_date }}</div>
          <div>{{ entity.email }} · {{ entity.phone }}</div>
          <div>Salário: R$ {{ entity.salary }} · {{ entity.is_active ? 'Ativo' : 'Inativo' }}</div>
        </template>

        <template #description>
          <div>
            <q-btn flat no-caps color="primary" :href="entity.contract" target="_blank" label="Ver contrato" />
          </div>
        </template>

        <template #actions>
          <Actions :entity-id="entity.id" :edit-route-name="editRouteName" @delete="askDelete" />
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>