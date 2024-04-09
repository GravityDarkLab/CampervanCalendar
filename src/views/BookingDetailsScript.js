import { fetchBookingDetails, fetchStations } from '@/service/stationService'

export default {
  name: 'BookingDetailsScript',
  /**
   * Component's data properties
   * @returns {Object} The data object
   */
  data() {
    return {
      booking: null, //Object that holds the booking details
      loading: false,
      stations: []
    }
  },
  methods: {
    /**
     * Navigates to the previous page in the history
     */
    goBack() {
      this.$router.go(-1)
    },
    /**
     * Fetches the details of a specific booking and processes it.
     * @param {string} stationId The ID of the station to fetch bookings for
     * @param {string} bookingId The ID of the booking to fetch details for
     */
    async getBookingDetails(stationId, bookingId) {
      try {
        this.loading = true
        this.booking = await fetchBookingDetails(stationId, bookingId)
        this.booking.totalPeriod = this.getTotalPeriod(
          new Date(this.booking.startDate),
          new Date(this.booking.endDate)
        )
        this.booking.startDate = new Date(this.booking.startDate).toLocaleString()
        this.booking.endDate = new Date(this.booking.endDate).toLocaleString()
        this.booking.pickupReturnStation = this.stations.find(
          (station) => station.id === this.booking.pickupReturnStationId
        ).name
      } catch (error) {
        console.error('Error fetching booking details:', error)
      } finally {
        this.loading = false
      }
    },
    /**
     * Calculates the total period between the start and end dates of a booking.
     * @param {Date} startDate The start date of the booking
     * @param {Date} endDate The end date of the booking
     * @returns {string} The total period in the format "x days and y hours"
     */
    getTotalPeriod(startDate, endDate) {
      const totalMilliseconds = endDate - startDate
      const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      return `${totalDays} days and ${totalHours} hours`
    }
  },
  /**
   * Lifecycle hook called after the component has been mounted.
   * It fetches the stations and booking details based on the route parameters.
   */
  async mounted() {
    this.loading = true
    const { stationId, bookingId } = this.$route.params
    try {
      this.stations = await fetchStations()
    } catch (error) {
      console.error('Error fetching stations:', error)
    }
    this.getBookingDetails(stationId, bookingId)
  }
}
