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
    const convertMetersToKm = (routeTrajectory.distanceMeters)/1000
    const drivers = await prisma.drivers.findMany({
      where: {
        minKm: {
          lte: 2
        }
      },
        include: {
          review: true,
        },
      });

      const formatedData = {
        origin: {
          latitude: from.lat,
          longitude: from.lng,
        },
        destination: {
          latitude: to.lat,
          longitude: to.lng,
        },
        "distance": routeTrajectory.routes[0].distanceMeters,
        "duration": routeTrajectory.routes[0].duration,
        options: drivers.map((driver) => {
          const { id, name, description, vehicle, value, review } = driver;
          return {
            id,
            name,
            description,
            vehicle,
            review: review ? {
              rating: review.rating,
              comment: review.comment,
            } : null,
            value,
          };
        }),
        routeResponse: routeTrajectory,
      };

    return { status: 200, result: formatedData };
  }
}

export default RidesService;