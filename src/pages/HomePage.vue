<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCrud } from '../composables/useCrud'

const router = useRouter()
const { isAuthenticated, user } = useAuth()
const { items, list } = useCrud('properties')

const slide = ref('rio')
const staySlide = ref('hotel')

const brazilianStates = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
  'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
  'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
  'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
  'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins',
]

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
const guestsDisplay = computed(() => `${guests.value.rooms} quarto${guests.value.rooms > 1 ? 's' : ''}, ${guests.value.people} pessoa${guests.value.people > 1 ? 's' : ''}`)

function incrementGuests(field, max) {
  if (guests.value[field] < max) guests.value[field]++
}
function decrementGuests(field, min) {
  if (guests.value[field] > min) guests.value[field]--
}

const heroImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80'

const destinations = [
  {
    id: 'rio',
    title: 'Rio de Janeiro',
    subtitle: 'Praias, trilhas e estadias com vista para o mar',
    image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bahia',
    title: 'Bahia',
    subtitle: 'Resorts, centros historicos e dias ensolarados',
    image: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sao-paulo',
    title: 'São Paulo',
    subtitle: 'Hoteis urbanos, apartamentos e viagens de negocio',
    image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pernambuco',
    title: 'Pernambuco',
    subtitle: 'Litoral, cultura e acomodações perto de tudo',
    image: 'https://www.maladeaventuras.com/wp-content/uploads/2024/08/recife.jpg',
  },
]

const stayTypes = [
  {
    id: 'hotel',
    title: 'Hoteis',
    icon: 'hotel',
    description: 'Opcoes praticas para viagens curtas, familias e trabalho.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'resort',
    title: 'Resorts',
    icon: 'pool',
    description: 'Estruturas completas para descansar sem pressa.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'apartamento',
    title: 'Apartamentos',
    icon: 'apartment',
    description: 'Mais privacidade para estadias longas ou em grupo.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pousada',
    title: 'Pousadas',
    icon: 'villa',
    description: 'Acolhimento local para uma viagem mais leve.',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80',
  },
]

const featured = computed(() => {
  const active = items.value.filter((property) => property.is_active !== false)
  return active.slice(0, 4)
})

const greeting = computed(() => {
  if (!isAuthenticated.value) return 'Planeje sua estadia com praticidade!'
  return `Sua proxima parada, ${user.value?.username || 'hospede'}`
})

function goToLogin() {
  router.push({ name: 'login', query: { next: '/' } })
}

function goToRegister() {
  router.push({ name: 'register' })
}

function explore() {
  if (!isAuthenticated.value) {
    goToLogin()
    return
  }
  router.push({ name: 'properties-list' })
}

function goToReservations() {
  if (!isAuthenticated.value) {
    goToLogin()
    return
  }
  router.push({ name: 'reservations-list' })
}

onMounted(() => list({ ordering: '-rating' }))
</script>

<template>
  <div class="home-page">
    <section class="hero-section" :style="{ backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(41, 41, 41, 0.68), rgba(0, 0, 0, 0.18)), url(${heroImage})` }">
      <div class="home-container hero-content">
        <div class="hero-copy">
          <q-badge color="white" text-color="black" class="q-mb-md hero-badge" label="Host Flow viagens" />
          <h1>{{ greeting }}</h1>
          <p>
            Descubra lugares, compare estilos de hospedagem e siga para a reserva
            quando encontrar uma opção que combina com a sua viagem.
          </p>
          <div class="hero-actions">
            <q-btn
              unelevated
              color="white"
              text-color="black"
              icon="search"
              :label="isAuthenticated ? 'Explorar opções' : 'Ver sugestões'"
              @click="explore"
            />
            <q-btn
              v-if="!isAuthenticated"
              outline
              color="white"
              icon="person_add"
              label="Criar conta"
              @click="goToRegister"
            />
            <q-btn
              v-else
              outline
              color="white"
              icon="event_available"
              label="Minhas reservas"
              @click="goToReservations"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="search-band">
      <div class="home-container">
        <q-card class="search-card" flat>
          <!-- Destino -->
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
                  v-for="state in brazilianStates"
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

          <!-- Quando -->
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

          <!-- Hóspedes -->
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

          <q-btn unelevated color="dark" icon="search" label="Buscar" @click="explore" />
        </q-card>
      </div>
    </section>

    <section class="home-section">
      <div class="home-container">
        <div class="section-heading">
          <div>
            <h2>Hospedagens em destaque</h2>
            <p>Algumas opcoes cadastradas no Host Flow para voce conhecer.</p>
          </div>
          <q-btn flat color="grey-10" icon-right="arrow_forward" label="Ver todas" @click="explore" />
        </div>

        <div v-if="featured.length" class="row q-col-gutter-lg">
          <div v-for="property in featured" :key="property.id" class="col-12 col-sm-6 col-md-3">
            <q-card class="property-card cursor-pointer" flat bordered @click="explore">
              <q-img :src="property.photo || heroImage" height="170px" />
              <q-card-section>
                <div class="property-title">{{ property.name }}</div>
                <div class="property-meta">
                  <q-icon name="star" color="grey-9" />
                  <span>{{ property.rating || 'Novo' }}</span>
                </div>
                <div class="property-address">{{ property.address || 'Brasil' }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-banner v-else rounded class="empty-featured">
          <template #avatar>
            <q-icon name="travel_explore" color="grey-10" size="34px" />
          </template>
          As hospedagens cadastradas aparecem aqui quando a API estiver disponivel.
        </q-banner>
      </div>
    </section>

    <section class="home-section">
      <div class="home-container">
        <div class="section-heading">
          <div>
            <h2>Destinos mais procurados</h2>
            <p>Estados e cidades brasileiras para inspirar a proxima reserva.</p>
          </div>
          <q-btn flat color="grey-10" icon-right="arrow_forward" label="Ver propriedades" @click="explore" />
        </div>

        <q-carousel
          v-model="slide"
          animated
          arrows
          navigation
          swipeable
          infinite
          height="360px"
          class="destination-carousel"
        >
          <q-carousel-slide
            v-for="destination in destinations"
            :key="destination.id"
            :name="destination.id"
            class="destination-slide"
            :img-src="destination.image"
            @click="explore"
          >
            <div class="destination-overlay">
              <q-icon name="location_on" size="30px" />
              <div>
                <h3>{{ destination.title }}</h3>
                <p>{{ destination.subtitle }}</p>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </section>

    <section class="home-section soft-section">
      <div class="home-container">
        <div class="section-heading">
          <div>
            <h2>Tipos de acomodacoes</h2>
            <p>Escolha o estilo de estadia que combina com sua viagem.</p>
          </div>
        </div>

        <q-carousel
          v-model="staySlide"
          animated
          arrows
          swipeable
          height="330px"
          class="stay-carousel lt-md"
        >
          <q-carousel-slide
            v-for="stay in stayTypes"
            :key="stay.id"
            :name="stay.id"
            class="stay-slide"
            @click="explore"
          >
            <q-img :src="stay.image" class="stay-slide-image" />
            <div class="stay-slide-content">
              <q-icon :name="stay.icon" size="32px" color="grey-10" />
              <h3>{{ stay.title }}</h3>
              <p>{{ stay.description }}</p>
            </div>
          </q-carousel-slide>
        </q-carousel>

        <div class="row q-col-gutter-lg gt-sm">
          <div v-for="stay in stayTypes" :key="stay.id" class="col-3">
            <q-card class="stay-card cursor-pointer" flat bordered @click="explore">
              <q-img :src="stay.image" height="150px" />
              <q-card-section>
                <q-icon :name="stay.icon" size="30px" color="grey-10" />
                <h3>{{ stay.title }}</h3>
                <p>{{ stay.description }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section cta-section">
      <div class="home-container cta-content">
        <div>
          <h2>{{ isAuthenticated ? 'Continue planejando sua viagem' : 'Entre para reservar com mais facilidade' }}</h2>
          <p>
            {{ isAuthenticated
              ? 'Acesse suas reservas, compare hospedagens e acompanhe suas proximas estadias.'
              : 'Com uma conta, voce pode criar reservas e voltar rapidamente para as opcoes favoritas.' }}
          </p>
        </div>
        <div class="cta-actions">
          <q-btn
            unelevated
            color="white"
            text-color="black"
            :icon="isAuthenticated ? 'event_available' : 'login'"
            :label="isAuthenticated ? 'Ver reservas' : 'Fazer login'"
            @click="isAuthenticated ? goToReservations() : goToLogin()"
          />
          <q-btn
            v-if="!isAuthenticated"
            outline
            color="white"
            icon="person_add"
            label="Criar conta"
            @click="goToRegister"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  background: #f4f4f4;
  color: #161616;
}

.home-container {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.hero-section {
  min-height: 520px;
  background-position: center;
  background-size: cover;
  color: white;
}

.hero-content {
  display: flex;
  align-items: center;
  min-height: 520px;
  padding: 56px 0 82px;
}

.hero-copy {
  max-width: 720px;
}

.hero-badge {
  letter-spacing: 0;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 0;
  max-width: 840px;
  font-size: clamp(2.25rem, 7vw, 4.55rem);
  font-weight: 800;
  line-height: 1.04;
}

.hero-copy p {
  max-width: 640px;
  margin: 22px 0 0;
  font-size: 1.16rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.92);
}

.hero-actions,
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.search-band {
  margin-top: -54px;
  position: relative;
  z-index: 2;
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

.search-card {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(0, 0, 0, 0.12);
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

.search-item span,
.section-heading p,
.property-address,
.stay-card p,
.stay-slide-content p,
.cta-content p {
  color: #6b6b6b;
}

.search-item strong {
  display: block;
  color: #161616;
  font-size: 1rem;
}

.home-section {
  padding: 60px 0;
}

.soft-section {
  background: #ffffff;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 24px;
}

.section-heading h2,
.cta-content h2 {
  margin: 0;
  font-size: clamp(1.7rem, 4vw, 2.45rem);
  font-weight: 800;
  line-height: 1.12;
}

.section-heading p {
  margin: 8px 0 0;
  font-size: 1rem;
}

.destination-carousel,
.stay-carousel,
.property-card,
.stay-card {
  border-radius: 8px;
  overflow: hidden;
}

.destination-carousel {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.13);
}

.destination-slide {
  cursor: pointer;
  padding: 0;
}

.destination-overlay {
  display: flex;
  align-items: end;
  gap: 14px;
  min-height: 100%;
  padding: 40px;
  color: white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.78));
}

.destination-overlay h3 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
}

.destination-overlay p {
  margin: 6px 0 0;
  max-width: 520px;
  font-size: 1.06rem;
}

.stay-card,
.property-card {
  height: 100%;
  background: #ffffff;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.stay-card:hover,
.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
}

.stay-card h3,
.stay-slide-content h3 {
  margin: 10px 0 6px;
  font-size: 1.2rem;
  font-weight: 800;
}

.stay-slide {
  padding: 0;
  background: white;
}

.stay-slide-image {
  height: 190px;
}

.stay-slide-content {
  padding: 18px;
}

.property-title {
  min-height: 48px;
  font-weight: 800;
  font-size: 1.05rem;
  line-height: 1.25;
}

.property-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  font-weight: 700;
}

.property-address {
  margin-top: 6px;
  font-size: 0.9rem;
  line-height: 1.35;
}

.empty-featured {
  background: white;
  border: 1px solid #dedede;
}

.cta-section {
  background: #111111;
  color: white;
}

.cta-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
}

.cta-content p {
  max-width: 620px;
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.82);
}

@media (max-width: 1023px) {
  .search-card {
    grid-template-columns: 1fr;
  }

  .section-heading,
  .cta-content {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 599px) {
  .home-container {
    width: min(100% - 20px, 1180px);
  }

  .hero-section,
  .hero-content {
    min-height: 560px;
  }

  .hero-content {
    padding: 42px 0 78px;
  }

  .hero-copy p {
    font-size: 1rem;
  }

  .home-section {
    padding: 42px 0;
  }

  .destination-overlay {
    align-items: end;
    padding: 24px;
  }

  .search-band {
    margin-top: -36px;
  }
}
</style>
