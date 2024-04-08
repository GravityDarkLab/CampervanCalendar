import { fetchBookingDetails, fetchStations } from '@/service/stationService'

export default {
  name: 'BookingDetails',
  data() {
    return {
      booking: null,
      loading: false,
      stations: []
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
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

    getTotalPeriod(startDate, endDate) {
      const totalMilliseconds = endDate - startDate
      const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      return `${totalDays} days and ${totalHours} hours`
    }
  },
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
