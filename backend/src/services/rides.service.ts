import { connect } from 'http2';
import prisma from '../db/connection';
import { Driver, RideConfirm } from '../entities/entities';
import getCoordinates from '../utils/getCordinates';
import getRoute from '../utils/getRoutes';

class RidesService {  


  public async findAll() {
    const rides = await prisma.rides.findMany();
    return { status: 200, result: rides };
  }

  public async estimateRide(origin: string, destination: string, customer_id: string) {
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
        options: drivers.map((driver: any) => {
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

  public async rideConfirm(data: RideConfirm) {
    const { customerId, origin, destination, distance, duration, driver, value } = data

      const findDriver = await prisma.drivers.findUnique({
        where: {
          id: driver.id,
        },
        include: {
          review: true,
        },
      });

      if (!findDriver) {
        return {
          status: 404,
          error_code: "DRIVER_NOT_FOUND",
          error_description: `Driver with ID ${driver.id} not found`
        };
      }
    
    if (distance < findDriver.minKm) {
      return {
        status: 406,
        error_code: "INVALID_DISTANCE",
        error_description: `The distance (${distance} km) is less than the minimum distance (${findDriver.minKm} km) that the driver is willing to drive.`,
      };
    }

    const from = await getCoordinates(origin)
    const to = await getCoordinates(destination)
    const routeTrajectory = await getRoute(from, to)

    console.log(routeTrajectory, '---------')
    if (routeTrajectory.routes.length > 0) {
      return {
        status: 406,
        error_code: "INVALID_DISTANCE",
        error_description: `There is no route to this origin and destination`,
      };
    }

  const persistRide = await prisma.rides.create({
    data: {
      customerId,
      date: new Date(),  // Usando Date() para o campo DateTime
      origin,
      destination,
      distance,
      duration,
      driver: { connect: { id: findDriver.id } },  // Relacionando o motorista
      value,
    },
  });


    console.log(persistRide, '------------')


      return { status: 200, result: { "success": true } };
    }
  }

export default RidesService;