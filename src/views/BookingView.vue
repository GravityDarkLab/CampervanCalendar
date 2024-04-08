<template>
  <div id="app">
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
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-parent">
      <calendar-view
        :item-top="themeOptions.top"
        :item-content-height="themeOptions.height"
        :item-border-height="themeOptions.border"
        :current-period-label="themeOptions.currentPeriodLabel"
        :items="items"
        :show-date="showDate"
        :display-period-uom="displayPeriodUom"
        :display-period-count="displayPeriodCount"
        :starting-day-of-week="1"
        :class="themeClasses"
        @click-item="onClickItem"
      >
        <template #header="{ headerProps }">
          <calendar-view-header
            :header-props="headerProps"
            @input="setShowDate"
            :previous-year-label="themeOptions.previousYearLabel"
            :previous-period-label="themeOptions.previousPeriodLabel"
            :next-period-label="themeOptions.nextPeriodLabel"
            :next-year-label="themeOptions.nextYearLabel"
            class="header-modern"
          />
        </template>
      </calendar-view>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

import { CalendarView, CalendarViewHeader, CalendarMath } from 'vue-simple-calendar'

export default {
  name: 'App',
  components: {
    CalendarView,
    CalendarViewHeader
  },
  data() {
    return {
      useDefaultTheme: true,
      stations: [],
      selectedStation: null,
      selectedBooking: {},
      showDate: this.specificMonth(2021, 5, 1),
      displayPeriodUom: 'week',
      items: []
    }
  },
  computed: {
    themeClasses() {
      return {
        'theme-gcal': this.useDefaultTheme
      }
    },
    themeOptions() {
      return {
        top: '2.6em',
        height: '2em',
        border: '1px',
        previousYearLabel: '\uE5CB\uE5CB',
        previousPeriodLabel: '\uE5CB',
        nextPeriodLabel: '\uE5CC',
        nextYearLabel: '\uE5CC\uE5CC'
      }
    },

    userLocale() {
      return CalendarMath.getDefaultBrowserLocale
    },
    dayNames() {
      return CalendarMath.getFormattedWeekdayNames(this.userLocale, 'long', 0)
    }
  },
  mounted() {
    this.fetchStations()
  },

  methods: {
    thisMonth(d, h, m) {
      const t = new Date()
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
    },
    specificMonth(y, m, d, h, min) {
      return new Date(y, m, d, h || 0, min || 0)
    },
    onClickItem(e) {
      this.message = `You clicked: ${e.title}`
      console.log('Clicked item:', e)
    },
    setShowDate(d) {
      this.showDate = d
      console.log('Changing calendar view to:', d)
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
      console.log('Events:', this.items)
    }
  }
}
</script>

<style>
@import '../../node_modules/vue-simple-calendar/dist/css/gcal.css';
@import '../../node_modules/vue-simple-calendar/dist/css/holidays-ue.css';
@import '../../node_modules/vue-simple-calendar/dist/css/holidays-us.css';
@import '../../node_modules/vue-simple-calendar/dist/css/default.css';

@import '../../node_modules/vue-simple-calendar/dist/style.css';

.calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 150vh;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.cv-item {
  border-radius: 6px; /* Rounded corners for a softer look */
  transition:
    box-shadow 0.3s ease-in-out,
    transform 0.2s;
  background: linear-gradient(45deg, #b5dbee, #cae0eb); /* Subtle gradient for depth */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow for 3D effect */
  cursor: pointer; /* Indicates that the item is clickable */
}

.cv-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* More prominent shadow on hover */
  transform: translateY(-2px); /* Slight lift effect on hover */
}

.header-modern {
  background-color: #f0f4f8;
}
</style>
