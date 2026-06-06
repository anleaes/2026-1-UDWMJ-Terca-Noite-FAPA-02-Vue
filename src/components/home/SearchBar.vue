<script setup>
import { computed, ref } from 'vue'
import { BRAZILIAN_STATES } from '../../constants/home'

const emit = defineEmits(['search'])

const selectedState = ref(null)
const statePopup = ref(false)

const dateRange = ref({ from: null, to: null })
const datePopup = ref(false)
const dateDisplay = computed(() => {
  if (dateRange.value.from && dateRange.value.to)
    return `${dateRange.value.from} → ${dateRange.value.to}`
  if (dateRange.value.from) return dateRange.value.from
  return 'Escolha suas datas'
})

const guests = ref({ rooms: 1, people: 2 })
const guestsPopup = ref(false)
const guestsDisplay = computed(
  () => `${guests.value.rooms} quarto${guests.value.rooms > 1 ? 's' : ''}, ${guests.value.people} pessoa${guests.value.people > 1 ? 's' : ''}`,
)

function incrementGuests(field, max) {
  if (guests.value[field] < max) guests.value[field]++
}
function decrementGuests(field, min) {
  if (guests.value[field] > min) guests.value[field]--
}

function onSearch() {
  emit('search', {
    state: selectedState.value,
    dateRange: dateRange.value,
    guests: guests.value,
  })
}
</script>

<template>
  <section class="search-band">
    <div class="home-container">
      <q-card class="search-card" flat>
        <div class="search-item cursor-pointer" @click="statePopup = true">
          <q-icon name="place" size="28px" color="grey-9" />
          <div>
            <span>Destino</span>
            <strong>{{ selectedState || 'Selecione o estado' }}</strong>
          </div>
        </div>
        <q-dialog v-model="statePopup">
          <q-card style="min-width: 320px; max-width: 400px">
            <q-card-section class="text-h6">Selecione o estado</q-card-section>
            <q-separator />
            <q-list>
              <q-item
                v-for="state in BRAZILIAN_STATES"
                :key="state"
                clickable
                :active="selectedState === state"
                active-class="bg-grey-2"
                @click="selectedState = state; statePopup = false"
              >
                <q-item-section>{{ state }}</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-dialog>

        <q-separator vertical class="gt-sm" />

        <div class="search-item cursor-pointer" @click="datePopup = true">
          <q-icon name="calendar_month" size="28px" color="grey-9" />
          <div>
            <span>Quando</span>
            <strong>{{ dateDisplay }}</strong>
          </div>
        </div>
        <q-dialog v-model="datePopup">
          <q-card>
            <q-card-section class="text-h6">Escolha as datas</q-card-section>
            <q-separator />
            <q-card-section>
              <q-date v-model="dateRange" range minimal />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Limpar" @click="dateRange = { from: null, to: null }" />
              <q-btn unelevated color="dark" label="Confirmar" @click="datePopup = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-separator vertical class="gt-sm" />

        <div class="search-item cursor-pointer" @click="guestsPopup = true">
          <q-icon name="group" size="28px" color="grey-9" />
          <div>
            <span>Hóspedes</span>
            <strong>{{ guestsDisplay }}</strong>
          </div>
        </div>
        <q-dialog v-model="guestsPopup">
          <q-card style="min-width: 300px">
            <q-card-section class="text-h6">Hóspedes</q-card-section>
            <q-separator />
            <q-card-section class="q-gutter-md">
              <div class="guests-row">
                <div>
                  <div class="text-weight-bold">Quartos</div>
                  <div class="text-grey-7 text-caption">Número de quartos</div>
                </div>
                <div class="guests-counter">
                  <q-btn round flat icon="remove" @click="decrementGuests('rooms', 1)" />
                  <span class="text-h6">{{ guests.rooms }}</span>
                  <q-btn round flat icon="add" @click="incrementGuests('rooms', 10)" />
                </div>
              </div>
              <div class="guests-row">
                <div>
                  <div class="text-weight-bold">Pessoas</div>
                  <div class="text-grey-7 text-caption">Número de hóspedes</div>
                </div>
                <div class="guests-counter">
                  <q-btn round flat icon="remove" @click="decrementGuests('people', 1)" />
                  <span class="text-h6">{{ guests.people }}</span>
                  <q-btn round flat icon="add" @click="incrementGuests('people', 20)" />
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn unelevated color="dark" label="Confirmar" @click="guestsPopup = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-btn unelevated color="dark" icon="search" label="Buscar" @click="onSearch" />
      </q-card>
    </div>
  </section>
</template>

<style scoped>
.search-band {
  margin-top: -54px;
  position: relative;
  z-index: 2;
}

.search-card {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.14);
}

.search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 4px 8px;
}

.search-item span {
  color: var(--color-text-muted);
}

.search-item strong {
  display: block;
  color: var(--color-text);
  font-size: 1rem;
}

.guests-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.guests-counter {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 1023px) {
  .search-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 599px) {
  .search-band {
    margin-top: -36px;
  }
}
</style>
