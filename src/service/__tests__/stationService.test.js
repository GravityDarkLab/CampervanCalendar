import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { fetchStations, fetchBookingDetails } from '../stationService'

vi.mock('axios')

describe('stationService', () => {
  it('fetchStations should return a list of stations', async () => {
    const mockStations = [
      { id: '1', name: 'Station 1' },
      { id: '2', name: 'Station 2' }
    ]
    axios.get.mockResolvedValue({ data: mockStations })

    const stations = await fetchStations()

    expect(stations).toEqual(mockStations)
    expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations')
  })

  it('fetchStations should throw an error when the request fails', async () => {
    const errorMessage = 'Network Error'
    axios.get.mockRejectedValue(new Error(errorMessage))

    await expect(fetchStations()).rejects.toThrow(errorMessage)
  })

  it('fetchBookingDetails should return booking details for a specific booking', async () => {
    const mockBookingDetails = { id: '1', customerName: 'Max Mustermann' }
    const stationId = '1'
    const bookingId = '2'
    axios.get.mockResolvedValue({ data: mockBookingDetails })

    const bookingDetails = await fetchBookingDetails(stationId, bookingId)

    expect(bookingDetails).toEqual(mockBookingDetails)
    expect(axios.get).toHaveBeenCalledWith(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${bookingId}`
    )
  })

  it('fetchBookingDetails should throw an error when the request fails', async () => {
    const errorMessage = 'Network Error'
    const stationId = '1'
    const bookingId = '2'
    axios.get.mockRejectedValue(new Error(errorMessage))

    await expect(fetchBookingDetails(stationId, bookingId)).rejects.toThrow(errorMessage)
  })
})
