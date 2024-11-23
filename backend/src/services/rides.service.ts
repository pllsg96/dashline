import prisma from '../db/connection';
import getCoordinates from '../utils/getCordinates';
import getRoute from '../utils/getRoutes';

class RidesService {  


  public async findAll() {
    const rides = await prisma.rides.findMany();
    return { status: 200, result: rides };
  }

  public async estimateRide(origin: string, destination: string, userId: string) {
    const from = await getCoordinates(origin)
    const to = await getCoordinates(destination)
    const routeTrajectory = await getRoute(from, to)
    const formatedData = {
      "origin": {
        "latitude": from.lat,
        "longitude": from.lng,
      },
      "destination": {
        "latitude": to.lat,
        "longitude": to.lng,
      },
      "distance": routeTrajectory.distanceMeters,
      "duration": routeTrajectory.duration,
      "options": [
        {
          "id": "id",
          "name": "name",
          "description": "description",
          "vehicle": "vehicle",
          "review":
            { 
              "rating": "rating",
              "comment": "comment"
            },
          "value": "value"
        },
      ],
      "routeResponse": routeTrajectory
    }
    // const rides = await prisma.rides.findMany();
    return { status: 200, result: formatedData };
  }
}

export default RidesService;