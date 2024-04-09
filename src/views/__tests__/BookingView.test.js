import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BookingView from '@/views/BookingViewScript'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'

// Mock the fetchStations function
vi.mock('../../service/stationService', () => ({
  fetchStations: vi.fn().mockResolvedValue([
    {
      id: '1',
      name: 'Station 1',
      bookings: [
        {
          id: '1',
          customerName: 'Max Mustermann',
          startDate: new Date(),
          endDate: new Date(),
          pickupReturnStationId: '1'
        },
        {
          id: '2',
          customerName: 'Max Mustermann',
          startDate: new Date(),
          endDate: new Date(),
          pickupReturnStationId: '1'
        }
      ]
    },
    { id: '2', name: 'Station 2', bookings: [] }
  ])
}))

// Use fake timers
vi.useFakeTimers()

// Test the BookingView component
describe('BookingView', () => {
  let wrapper

  beforeEach(() => {
    // Mount the component before each test
    wrapper = mount(BookingView, {
      global: {
        components: {
          CalendarView,
          CalendarViewHeader
        },
        stubs: {
          'router-link': true,
          'router-view': true
        },
        mocks: {
          $router: {
            push: vi.fn()
          }
        }
      }
    })
  })
  // Test the fetchStations call
  it('fetches the stations', async () => {
    // Wait for all promises to resolve
    vi.runAllTimers()
    // vm: View Model, represents the BookingView instance in this case
    expect(wrapper.vm.stations.length).toBeGreaterThan(0)
    expect(wrapper.vm.selectedStation).not.toBeNull()
  })

  // Test the onClickItem method
  it('navigates to booking details when a booking is clicked', async () => {
    await vi.runAllTimers()
    const mockBooking = wrapper.vm.stations.find((station) => station.id === '1').bookings[0]
    wrapper.vm.onClickItem(mockBooking)

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'BookingDetails',
      params: {
        stationId: wrapper.vm.selectedStation,
        bookingId: mockBooking.id
      }
    })
  })
})
