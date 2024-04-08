<template>
  <div class="container mx-auto p-4">
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4">
        <button
          @click="goBack"
          class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
        <h2 class="text-2xl font-semibold">Booking Details</h2>
        <div v-if="booking">
          <p class="text-gray-600"><strong>Customer Name:</strong> {{ booking.customerName }}</p>
          <p class="text-gray-600"><strong>Start Date:</strong> {{ booking.startDate }}</p>
          <p class="text-gray-600"><strong>End Date:</strong> {{ booking.endDate }}</p>
          <p class="text-gray-600"><strong>Total Periode</strong> {{ booking.totalPeriod }}</p>
          <p class="text-gray-600">
            <strong>Return Station:</strong> {{ booking.pickupReturnStationId }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BookingDetails',
  data() {
    return {
      booking: null
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    fetchBookingDetails(stationId, bookingId) {
      const url = `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${bookingId}`
      axios
        .get(url)
        .then((response) => {
          this.booking = response.data
          this.booking.totalPeriod = this.getTotalPeriod(
            new Date(this.booking.startDate),
            new Date(this.booking.endDate)
          )
          this.booking.startDate = new Date(this.booking.startDate).toLocaleString()
          this.booking.endDate = new Date(this.booking.endDate).toLocaleString()
        })
        .then(() => {
          console.log('Booking details fetched:', this.booking)
        })
        .catch((error) => {
          console.error('Error fetching booking details:', error)
        })
    },
    getTotalPeriod(startDate, endDate) {
      const totalMilliseconds = endDate - startDate
      const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      return `${totalDays} days and ${totalHours} hours`
    }
  },
  mounted() {
    const { stationId, bookingId } = this.$route.params
    this.fetchBookingDetails(stationId, bookingId)
  }
}
</script>

<style>
/* Add custom styles here */
</style>
