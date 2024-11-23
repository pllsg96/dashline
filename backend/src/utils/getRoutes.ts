  
const axios = require('axios');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });  

// Função para obter rota
    export default const getRoute = async (origin, destination) => {
      const response = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', {
        origin: {
          location: {
            latLng: origin,
          },
        },
        destination: {
          location: {
            latLng: destination,
          },
        },
        travelMode: 'DRIVE',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline',
        },
      });
      return response.data;
    };
