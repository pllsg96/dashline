  
const axios = require('axios');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });  

// Função para obter rota
    export default async function getRoute(origin: any, destination: any): Promise<any> {
      const response = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', {
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng
            }
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.lat,
              longitude: destination.lng
            }
          },
        },
        travelMode: 'DRIVE',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
          'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline',
        },
      });
      return response.data;
    };
