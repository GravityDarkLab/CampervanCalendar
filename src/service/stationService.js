// stationService.js
import axios from 'axios'

const BASE_URL = 'https://605c94c36d85de00170da8b4.mockapi.io/stations'

export const fetchStations = async () => {
  try {
    const response = await axios.get(BASE_URL)
    const stations = response.data.filter((station) => station.name !== 'station-name{{i}}')
    return stations
  } catch (error) {
    console.error('Error fetching stations:', error)
    throw error // Rethrow to handle it in the consuming component
  }
}

export const fetchBookingDetails = async (stationId, bookingId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${stationId}/bookings/${bookingId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching booking details:', error)
    throw error
  }
}
