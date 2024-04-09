<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-lg rounded-lg max-w-md w-full overflow-hidden">
      <div class="p-6">
        <button
          @click="goBack"
          class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-150"
        >
          Go Back
        </button>
        <h2 class="text-2xl font-semibold text-center mb-4">Booking Details</h2>
        <div v-if="loading" class="text-center py-4">
          <p>Loading booking details...</p>
        </div>
        <div v-else-if="booking" class="text-gray-800">
          <p class="mb-2"><strong>Customer Name:</strong> {{ booking.customerName }}</p>
          <p class="mb-2"><strong>Start Date:</strong> {{ booking.startDate }}</p>
          <p class="mb-2"><strong>End Date:</strong> {{ booking.endDate }}</p>
          <p class="mb-2"><strong>Total Period:</strong> {{ booking.totalPeriod }}</p>
          <p><strong>Return Station:</strong> {{ booking.pickupReturnStation }}</p>
        </div>
        <div v-else class="text-center py-4">
          <p>Failed to load booking details. Please try again later.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookingDetailsScript from './BookingDetailsScript'
export default BookingDetailsScript
</script>
