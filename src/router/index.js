import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: () => import('../pages/HomePage.vue') },
      { path: 'login', name: 'login', component: () => import('../pages/auth/LoginPage.vue') },
      {
        path: 'register',
        name: 'register',
        component: () => import('../pages/auth/RegisterPage.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../pages/auth/ProfilePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'employees',
        name: 'employees-list',
        component: () => import('../pages/employees/EmployeeListPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'employees/novo',
        name: 'employees-add',
        component: () => import('../pages/employees/EmployeeFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'employees/:id/editar',
        name: 'employees-edit',
        component: () => import('../pages/employees/EmployeeFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'guests',
        name: 'guests-list',
        component: () => import('../pages/guests/GuestListPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'guests/novo',
        name: 'guests-add',
        component: () => import('../pages/guests/GuestFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'guests/:id/editar',
        name: 'guests-edit',
        component: () => import('../pages/guests/GuestFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'invoices',
        name: 'invoices-list',
        component: () => import('../pages/invoices/InvoiceListPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'invoices/novo',
        name: 'invoices-add',
        component: () => import('../pages/invoices/InvoiceFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'invoices/:id/editar',
        name: 'invoices-edit',
        component: () => import('../pages/invoices/InvoiceFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'properties',
        name: 'properties-list',
        component: () => import('../pages/properties/PropertyListPage.vue'),
      },
      {
        path: 'properties/novo',
        name: 'properties-add',
        component: () => import('../pages/properties/PropertyFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'properties/:id/editar',
        name: 'properties-edit',
        component: () => import('../pages/properties/PropertyFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'properties/:id',
        name: 'properties-detail',
        component: () => import('../pages/properties/PropertyDetailPage.vue'),
      },
      {
        path: 'room-types',
        name: 'room_types-list',
        component: () => import('../pages/room_types/RoomTypeListPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'room-types/novo',
        name: 'room_types-add',
        component: () => import('../pages/room_types/RoomTypeFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'room-types/:id/editar',
        name: 'room_types-edit',
        component: () => import('../pages/room_types/RoomTypeFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'amenities',
        name: 'amenities-list',
        component: () => import('../pages/amenities/AmenityListPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'amenities/novo',
        name: 'amenities-add',
        component: () => import('../pages/amenities/AmenityFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'amenities/:id/editar',
        name: 'amenities-edit',
        component: () => import('../pages/amenities/AmenityFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'rooms',
        name: 'rooms-list',
        component: () => import('../pages/rooms/RoomListPage.vue'),
      },
      {
        path: 'rooms/novo',
        name: 'rooms-add',
        component: () => import('../pages/rooms/RoomFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'rooms/:id/editar',
        name: 'rooms-edit',
        component: () => import('../pages/rooms/RoomFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'reservations',
        name: 'reservations-list',
        component: () => import('../pages/reservations/ReservationListPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations/novo',
        name: 'reservations-add',
        component: () => import('../pages/reservations/ReservationFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations/:id/editar',
        name: 'reservations-edit',
        component: () => import('../pages/reservations/ReservationFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations/reservar/:id_room',
        name: 'reservations-book',
        component: () => import('../pages/reservations/BookRoomPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'reservation-items',
        name: 'reservation_items-list',
        component: () => import('../pages/reservation_items/ReservationItemListPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'reservation-items/novo',
        name: 'reservation_items-add',
        component: () => import('../pages/reservation_items/ReservationItemFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'reservation-items/:id/editar',
        name: 'reservation_items-edit',
        component: () => import('../pages/reservation_items/ReservationItemFormPage.vue'),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: 'reviews',
        name: 'reviews-list',
        component: () => import('../pages/reviews/ReviewListPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'reviews/novo',
        name: 'reviews-add',
        component: () => import('../pages/reviews/ReviewFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'reviews/:id/editar',
        name: 'reviews-edit',
        component: () => import('../pages/reviews/ReviewFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'service-categories',
        name: 'service_categories-list',
        component: () => import('../pages/service_categories/ServiceCategoryListPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'service-categories/novo',
        name: 'service_categories-add',
        component: () => import('../pages/service_categories/ServiceCategoryFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'service-categories/:id/editar',
        name: 'service_categories-edit',
        component: () => import('../pages/service_categories/ServiceCategoryFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'services',
        name: 'services-list',
        component: () => import('../pages/services/ServiceListPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'services/novo',
        name: 'services-add',
        component: () => import('../pages/services/ServiceFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'services/:id/editar',
        name: 'services-edit',
        component: () => import('../pages/services/ServiceFormPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const auth = useAuth()
  if (!auth.ready.value) await auth.loadMe()

  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return { path: '/login', query: { next: to.fullPath } }
  }
  if (to.meta.requiresEmployee && !auth.isEmployee.value) {
    return { path: '/' }
  }
})
