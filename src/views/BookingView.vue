<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios'

export default {
  components: { VueCal },
  data() {
    return {
      stations: [],
      selectedStation: null,
      selectedBooking: {},
      minEventWidth: 10,
      events: [],
      customersName: []
    }
  },
  mounted() {
    this.fetchStations()
  },
  methods: {
    onEventClick(event, e) {
      this.selectedBooking = event
      e.stopPropagation()
      this.$router.push({
        name: 'BookingDetails',
        params: {
          stationId: this.selectedStation,
          bookingId: event.id
        }
      })
    },
    async fetchStations() {
      try {
        const response = await axios.get('https://605c94c36d85de00170da8b4.mockapi.io/stations')
        this.stations = response.data
        if (this.stations.length > 0) {
          this.selectedStation = this.stations[0].id
          this.getStationBookings()
        }
      } catch (error) {
        console.error(error)
      }
    },
    getStationBookings() {
      if (!this.selectedStation) return
      const station = this.stations.find((station) => station.id === this.selectedStation)
      if (station && station.bookings) {
        this.customersName = station.bookings.map((booking) => {
          return booking.customerName
        })
        this.events = station.bookings.map((booking) => {
          const start = new Date(booking.startDate)
          const end = new Date(booking.endDate)
          return {
            title: booking.customerName,
            content: booking.pickupReturnStationId,
            id: booking.id,
            start: start,
            end: end,
            class: this.getClass(booking.customerName)
          }
        })
      }
    },
    getClass(customerName) {
      let classes = ['red', 'green', 'blue']
      let index = this.customersName.indexOf(customerName)
      return classes[index % classes.length]
    }
  }
}
</script>

<template>
  <div class="controls">
    <div class="flex justify-center items-center m-5">
      <div class="relative">
        <select
          v-model="selectedStation"
          @change="getStationBookings"
          class="block px-3 py-2 bg-white border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
        >
          <option v-for="station in stations" :key="station.id" :value="station.id">
            {{ station.name }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <vue-cal
    class="vuecal--blue-theme"
    active-view="week"
    hideViewSelector
    show-week-numbers
    today-button
    selected-date="2021-07-17"
    :events="events"
    :time="false"
    :content="false"
    :on-event-click="onEventClick"
    :min-event-width="minEventWidth"
    events-on-month-view="short"
  >
    ></vue-cal
  >
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vuecal {
  height: 100vh;
}
.vuecal__now-line {
  color: rgb(0, 0, 255);
}

.vuecal__event.red {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}

.vuecal__event.green {
  background-color: rgba(2, 136, 2, 0.9);
  border: 1px solid rgb(3, 89, 3);
  color: #fff;
}

.vuecal__event.blue {
  background-color: rgba(59, 59, 243, 0.9);
  border: 1px solid rgb(78, 78, 249);
  color: #fff;
}

.vuecal__event {
  cursor: pointer;
}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}

.v-dialog .v-card {
  border-radius: 16px; /* Adds rounded corners to the dialog */
}

.details {
  display: flex;
  align-items: center; /* Aligns the details icon with the text */
}

.subheading {
  font-weight: 600; /* Increases font weight for subheading */
  margin-left: 8px; /* Adds spacing after the icon */
}

.v-divider {
  margin-top: 16px;
  margin-bottom: 16px;
}

.v-chip {
  transform: translateY(2%); /* Aligns chip vertically with title */
}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 2px;
}

.vuecal--month-view .vuecal__no-event {
  display: none;
}
</style>
