<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCrud } from '../composables/useCrud'
import HeroSection from '../components/home/HeroSection.vue'
import HomeCta from '../components/home/HomeCta.vue'
import FeaturedProperties from '../components/home/FeaturedProperties.vue'
import StayTypesCarousel from '../components/home/StayTypesCarousel.vue'

const router = useRouter()
const { requireAuth } = useAuth()
const { items, list } = useCrud('properties')

const featured = computed(() =>
  items.value.filter((property) => property.is_active !== false).slice(0, 4),
)

function goToLogin() {
  router.push({ name: 'login', query: { next: '/' } })
}

function goToRegister() {
  router.push({ name: 'register' })
}

function explore() {
  requireAuth({ name: 'properties-list' })
}

function exploreByType(stay) {
  const type = stay && stay.id ? stay.id : undefined
  requireAuth({ name: 'properties-list', query: type ? { type } : {} })
}

function goToReservations() {
  requireAuth({ name: 'reservations-list' })
}

onMounted(() => list({ ordering: '-rating' }))
</script>

<template>
  <div class="home-page">
    <HeroSection
      @explore="explore"
      @register="goToRegister"
      @reservations="goToReservations"
    />

    <FeaturedProperties :properties="featured" @select="explore" />

    <StayTypesCarousel @select="exploreByType" />

    <HomeCta
      @login="goToLogin"
      @register="goToRegister"
      @reservations="goToReservations"
    />
  </div>
</template>

<style scoped>
.home-page {
  background: var(--color-bg-page);
  color: var(--color-text);
}
</style>
