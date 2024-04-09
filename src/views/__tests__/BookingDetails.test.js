import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import BookingDetailsView from '@/views/BookingDetails.vue'
import { fetchBookingDetails, fetchStations } from '@/service/stationService'

// Mock the service methods
vi.mock('@/service/stationService', () => ({
  fetchBookingDetails: vi.fn(),
  fetchStations: vi.fn()
}))

// Setup for each test
describe('BookingDetailsView', () => {
  let mockRouter

  // Setup the mocked router before each test
  beforeEach(() => {
    mockRouter = {
      go: vi.fn()
    }
  })

  /**
   * Creates a mounted BookingDetailsView wrapper
   * @param {Object} data The data object to use for the wrapper
   * @returns {Wrapper} The mounted wrapper
   */
  const createWrapper = (data = {}) => {
    return mount(BookingDetailsView, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { params: { stationId: '123', bookingId: 'abc' } }
        }
      },
      data() {
        return data
      }
    })
  }

  describe('initial loading state', () => {
    it('shows loading indicator when fetching data', async () => {
      fetchStations.mockResolvedValue([])
      fetchBookingDetails.mockResolvedValue({})

      const wrapper = createWrapper({ loading: true })

      expect(wrapper.text()).toContain('Loading booking details...')
      await flushPromises()
      expect(wrapper.text()).not.toContain('Loading booking details...')
    })
  })

  describe('data fetching and rendering', () => {
    it('displays booking details after fetching', async () => {
      const mockBooking = {
        customerName: 'Max Mustermann',
        startDate: '2020-01-01',
        endDate: '2020-01-05',
        pickupReturnStationId: '1',
        totalPeriod: '4 days and 0 hours'
      }
      const mockStations = [{ id: '1', name: 'Station 1' }]
      fetchStations.mockResolvedValue(mockStations)
      fetchBookingDetails.mockResolvedValue(mockBooking)

      const wrapper = createWrapper()

      await flushPromises()
      expect(wrapper.text()).toContain('Max Mustermann')
      expect(wrapper.text()).toContain('Station 1')
    })
  })

  describe('interaction', () => {
    it('navigates back when goBack is triggered', async () => {
      const wrapper = createWrapper()
      await wrapper.find('button').trigger('click')
      expect(mockRouter.go).toHaveBeenCalledWith(-1)
    })
  })
})
