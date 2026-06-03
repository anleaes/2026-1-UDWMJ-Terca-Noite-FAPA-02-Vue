<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCrud } from '../../composables/useCrud'
import { useAuth } from '../../composables/useAuth'
import { useRoomStatus } from '../../composables/useRoomStatus'
import BaseCard from '../../components/base/BaseCard.vue'

const route = useRoute()
const { isAuthenticated } = useAuth()
const { statusLabel } = useRoomStatus()

const propertiesApi = useCrud('properties')
const roomsApi = useCrud('rooms')
const property = ref(null)

const visibleRooms = computed(() =>
  roomsApi.items.value.filter(r => r.property === property.value?.id && r.is_active !== false)
)
const availableCount = computed(() =>
  visibleRooms.value.filter(r => r.status === 'AVAILABLE').length
)

onMounted(async () => {
  property.value = await propertiesApi.getOne(route.params.id)
  await roomsApi.search(property.value.name)
})
</script>

<template>
  <div v-if="property">
    <q-img v-if="property.photo" :src="property.photo" style="height:240px" class="q-mb-md" />
    <h1 class="text-h4">{{ property.name }}</h1>
    <p class="text-grey-7">{{ property.property_type }} · ★ {{ property.rating }} · {{ property.address }}</p>
    <p>{{ property.description }}</p>

    <h2 class="text-h5 q-mt-lg">Quartos ({{ availableCount }} disponíveis de {{ visibleRooms.length }})</h2>
    <div class="row q-col-gutter-md">
      <div v-for="room in visibleRooms" :key="room.id" class="col-12 col-sm-6 col-md-4">
        <BaseCard :image-url="room.photo">
          <template #title>Quarto {{ room.number }}</template>
          <template #meta>
            <div>{{ room.room_type }} · R$ {{ room.daily_rate }}/diária</div>
            <q-badge :color="statusLabel(room).color" :label="statusLabel(room).label" />
          </template>
          <template #description>{{ room.description }}</template>
          <template #actions>
            <q-btn v-if="isAuthenticated && room.status === 'AVAILABLE'"
                   color="primary"
                   :label="statusLabel(room).action"
                   :to="{ name: 'reservations-book', params: { id_room: room.id } }" />
            <q-btn v-else flat disable :label="statusLabel(room).action" />
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
