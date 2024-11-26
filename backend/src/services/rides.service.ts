import prisma from '../db/connection';
import getCoordinates from '../utils/getCordinates';
import getRoute from '../utils/getRoutes';
import { RideConfirm } from '../entities/entities';
import { connect } from 'http2';

class RidesService {
  public async findAll() {
    try {
      const rides = await prisma.rides.findMany();
      return { status: 200, result: rides };
    } catch (error) {
      return {
        status: 500,
        error_code: 'DATABASE_ERROR',
        error_description: 'Failed to retrieve rides from the database',
      };
    }
  }

  public async estimateRide(origin: string, destination: string, customer_id: string) {
    try {
      const from = await getCoordinates(origin);
      const to = await getCoordinates(destination);
      const routeTrajectory = await getRoute(from, to);
      const convertMetersToKm = routeTrajectory.distanceMeters / 1000;

      const drivers = await prisma.drivers.findMany({
        where: {
          minKm: {
            lte: 2,
          },
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
        distance: routeTrajectory.routes[0].distanceMeters,
        duration: routeTrajectory.routes[0].duration,
        options: drivers.map((driver: any) => {
          const { id, name, description, vehicle, value, review } = driver;
          return {
            id,
            name,
            description,
            vehicle,
            review: review
              ? {
                  rating: review.rating,
                  comment: review.comment,
                }
              : null,
            value,
          };
        }),
        routeResponse: routeTrajectory,
      };

      return { status: 200, result: formatedData };
    } catch (error) {
      return {
        status: 500,
        error_code: 'RIDE_ESTIMATION_FAILED',
        error_description: 'An error occurred while estimating the ride.',
      };
    }
  }

  public async rideConfirm(data: RideConfirm) {
    const { customer_id, origin, destination, distance, duration, driver, value } = data;

    try {
      
      const findCustomer = await prisma.customers.findUnique({
        where: {
          id: customer_id, 
        },
      });

      if (!findCustomer) {
        return {
          status: 404,
          error_code: 'CUSTOMER_NOT_FOUND',
          error_description: `Customer with ID ${customer_id} not found`,
        };
      }

      
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
          error_code: 'DRIVER_NOT_FOUND',
          error_description: `Driver with ID ${driver.id} not found`,
        };
      }

      if (distance < findDriver.minKm) {
        return {
          status: 406,
          error_code: 'INVALID_DISTANCE',
          error_description: `The distance (${distance} km) is less than the minimum distance (${findDriver.minKm} km) that the driver is willing to drive.`,
        };
      }


      
      await prisma.rides.create({
        data: {
          customer: { connect: { id: findCustomer.id } },
          date: new Date(),
          origin,
          destination,
          distance,
          duration,
          driver: { connect: { id: findDriver.id } },
          value,
        },
      });

      return { status: 200, result: { success: true } };
    } catch (error) {
      return {
        status: 500,
        error_code: 'RIDE_CONFIRMATION_FAILED',
        error_description: 'An error occurred while confirming the ride.',
      };
    }
  }

public async getRidesByCustomerId(customer_id: string, driver_id?: string) {
  try {
      const filter: any = { customerId: customer_id };

      if (driver_id) {
        filter.driverId =  +driver_id;  
      }
      
      const rides = await prisma.rides.findMany({
        where: filter,
        include: {
          driver: true,  
          
        },
      });
      return { status: 200, result: rides };
    } catch (error) {
      return {
        status: 500,
        error_code: 'DATABASE_ERROR',
        error_description: 'Failed to retrieve rides from the database',
      };
    }
}
  
  
}

export default RidesService;
