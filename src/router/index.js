import { createRouter, createWebHistory } from 'vue-router'
import BookingView from '../views/BookingView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BookigDetails from '../views/BookingDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: BookingView
    },
    {
      path: '/bookings/:stationId/:bookingId',
      name: 'BookingDetails',
      component: BookigDetails
    }
  ]
})

export default router
