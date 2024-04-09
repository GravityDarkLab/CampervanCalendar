<template>
  <div>
    <div class="flex justify-center items-center p-4 bg-gray-50" id="options">
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
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
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
  <div id="calendar" class="bg-gray-50">
    <div class="calendar-parent">
      <calendar-view
        :display-period-count="1"
        :time-format-options="{ hour: '2-digit', minute: '2-digit' }"
        :item-top="themeOptions.top"
        :item-content-height="themeOptions.height"
        :item-border-height="themeOptions.border"
        :current-period-label="themeOptions.currentPeriodLabel"
        :items="items"
        :show-date="showDate"
        :display-period-uom="displayPeriodUom"
        :starting-day-of-week="1"
        :class="themeClasses"
        @click-item="onClickItem"
        id="calendar-parent"
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
            id="calendar-header"
          />
        </template>
      </calendar-view>
    </div>
  </div>
</template>

<script>
import BookingView from './BookingView'
export default BookingView
</script>

<style>
@import '../assets/calendar.css';
</style>
