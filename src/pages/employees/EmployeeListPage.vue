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
        <template #title>{{ entity.first_name }} {{ entity.last_name }}</template>

        <template #meta>
          <p>
            Cargo: {{ entity.position }} · Contratado em
            <time :datetime="entity.hired_date">{{ entity.hired_date }}</time>
          </p>
          <address>{{ entity.email }} · {{ entity.phone }}</address>
          <p>Salário: R$ {{ entity.salary }} · {{ entity.is_active ? 'Ativo' : 'Inativo' }}</p>
        </template>

        <template #description>
          <q-btn
            flat
            no-caps
            color="primary"
            :href="entity.contract"
            target="_blank"
            label="Ver contrato"
          />
        </template>

        <template #actions>
          <Actions :entity-id="entity.id" :edit-route-name="editRouteName" @delete="askDelete" />
        </template>
      </BaseCard>
    </template>
  </BaseList>
</template>
