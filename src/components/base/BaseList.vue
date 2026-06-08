<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCrud } from '../../composables/useCrud'
import { useAuth } from '../../composables/useAuth'
import { useNotify } from '../../composables/useNotify'
import BaseEmptyState from './BaseEmptyState.vue'
import BaseConfirmDialog from './BaseConfirmDialog.vue'
import BaseRecordActions from './BaseRecordActions.vue'

const props = defineProps({
  title: { type: String, required: true },
  resource: { type: String, required: true },
  addRouteName: String,
  editRouteName: String,
  itemLabel: { type: String, default: 'registro' },
  searchPlaceholder: { type: String, default: 'Buscar...' },
  addRequiresEmployee: { type: Boolean, default: true },
  filter: { type: Function, default: null },
})

const { items, loading, list, search, remove } = useCrud(props.resource)
const { isAuthenticated, isEmployee } = useAuth()
const notify = useNotify()
const query = ref('')
const deleteDialog = ref(false)
const targetId = ref(null)

const canAdd = computed(
  () =>
    !!props.addRouteName &&
    isAuthenticated.value &&
    (!props.addRequiresEmployee || isEmployee.value)
)

const visibleItems = computed(() => (props.filter ? items.value.filter(props.filter) : items.value))

onMounted(list)

function onSearch() {
  query.value ? search(query.value) : list()
}
function askDelete(id) {
  targetId.value = id
  deleteDialog.value = true
}
async function confirmDelete() {
  try {
    await remove(targetId.value)
    notify.success('Excluído')
    list()
  } catch {
    notify.error('Falha ao excluir')
  }
}
</script>

<template>
  <div class="q-px-lg q-py-md">
  <h1 class="text-h4 q-mb-sm">{{ title }}</h1>

  <div class="q-mb-md">
    <slot name="header" />
  </div>

  <div class="row q-gutter-md q-mb-lg items-center">
    <q-input
      v-model="query"
      dense
      filled
      :placeholder="searchPlaceholder"
      class="col"
      @keyup.enter="onSearch"
    >
      <template #append><q-btn flat dense icon="search" @click="onSearch" /></template>
    </q-input>
    <q-btn
      v-if="canAdd"
      color="primary"
      icon="add"
      :label="`Novo ${itemLabel}`"
      :to="{ name: addRouteName }"
    />
  </div>

  <q-inner-loading :showing="loading" />

  <div v-if="!loading && visibleItems.length === 0">
    <BaseEmptyState :message="`Nenhum ${itemLabel} cadastrado.`" />
  </div>

  <div class="row q-col-gutter-md">
    <div v-for="entity in visibleItems" :key="entity.id" class="col-12 col-sm-6 col-md-4">
      <slot
        name="card"
        :entity="entity"
        :ask-delete="askDelete"
        :edit-route-name="editRouteName"
        :Actions="BaseRecordActions"
      />
    </div>
  </div>

  <BaseConfirmDialog v-model="deleteDialog" :label="itemLabel" @confirm="confirmDelete" />
  </div>
</template>
