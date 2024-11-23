
const axios = require('axios');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

export default async function getCoordinates(address: any) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    const location = response.data.results[0].geometry.location;
    return location;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
}