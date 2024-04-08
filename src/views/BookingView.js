import { CalendarView, CalendarViewHeader, CalendarMath } from 'vue-simple-calendar'
import { fetchStations } from '@/service/stationService'

export default {
  name: 'BookingView',
  components: {
    CalendarView,
    CalendarViewHeader
  },
  data() {
    return {
      useDefaultTheme: true, // Flag to toggle theme
      stations: [], // List of stations fetched from API
      selectedStation: null, // Currently selected station
      selectedBooking: {}, // Details of the selected booking
      showDate: this.specificMonth(2021, 5, 1), // Initial date to show in calendar
      displayPeriodUom: 'week', // Unit of measurement for display period
      items: [] // Bookings to display in calendar
    }
  },
  computed: {
    // Computed property to set the theme classes dynamically
    themeClasses() {
      return {
        'theme-gcal': this.useDefaultTheme
      }
    },
    // Theme options for calendar customization
    themeOptions() {
      return {
        top: '2.8em',
        height: '2.2em',
        border: '1px',
        previousYearLabel: '\uE5CB\uE5CB',
        previousPeriodLabel: '\uE5CB',
        nextPeriodLabel: '\uE5CC',
        nextYearLabel: '\uE5CC\uE5CC',
        currentPeriodLabel: 'Today'
      }
    },
    // Locale for the calendar
    userLocale() {
      return CalendarMath.getDefaultBrowserLocale()
    },
    // Day names formatted according to the user locale
    dayNames() {
      return CalendarMath.getFormattedWeekdayNames(this.userLocale, 'long', 0)
    }
  },
  mounted() {
    // Fetch stations when the component is mounted
    this.initStations()
  },

  methods: {
    // Returns a Date object representing the current month with specific day and time
    thisMonth(d, h, m) {
      const t = new Date()
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
    },
    // Returns a Date object representing a specific month, day, and time
    specificMonth(y, m, d, h, min) {
      return new Date(y, m, d, h || 0, min || 0)
    },
    // Event handler for clicking an item on the calendar
    onClickItem(e) {
      this.selectedBooking = e
      this.$router.push({
        name: 'BookingDetails',
        params: {
          stationId: this.selectedStation,
          bookingId: e.id
        }
      })
    },
    // Set the date to be shown in the calendar
    setShowDate(d) {
      this.showDate = d
      console.log('Changing calendar view to:', d)
    },
    // Fetch stations data from the API
    async initStations() {
      try {
        this.stations = await fetchStations()
        if (this.stations.length > 0) {
          this.selectedStation = this.stations[0].id
          this.getStationBookings()
        }
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    },
    // Fetch bookings for the selected station
    getStationBookings() {
      if (!this.selectedStation) return
      const station = this.stations.find((station) => station.id === this.selectedStation)
      if (station && station.bookings) {
        this.items = station.bookings.map((booking) => {
          const start = new Date(booking.startDate)
          const end = new Date(booking.endDate)
          return {
            title: booking.customerName,
            id: booking.id,
            startDate: start,
            endDate: end
          }
        })
      }
    }
  }
}
