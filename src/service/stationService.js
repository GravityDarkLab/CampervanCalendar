// stationService.js
import axios from 'axios'

const BASE_URL = 'https://605c94c36d85de00170da8b4.mockapi.io/stations'

/**
 * Fetches all stations from the API
 * @returns {Promise<Array>} A promise that resolves to an array of stations
 * @throws {Error} If the API request fails
 */
export const fetchStations = async () => {
  try {
    const response = await axios.get(BASE_URL)
    // Remove the invalid station in the mock API
    const stations = response.data.filter((station) => station.name !== 'station-name{{i}}')
    return stations
  } catch (error) {
    console.error('Error fetching stations:', error)
    throw error // Rethrow to handle it in the consuming component
  }
}

/**
 * Fetches details for a specific booking at a given station from the API
 * @param {string} stationId The ID of the station where the booking is made
 * @param {string} bookingId The ID of the booking to fetch details for
 * @returns {Promise<Object>} A promise that resolves to the details of the booking
 * @throws {Error} If the API request fails
 */
export const fetchBookingDetails = async (stationId, bookingId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${stationId}/bookings/${bookingId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching booking details:', error)
    throw error
  }
}
