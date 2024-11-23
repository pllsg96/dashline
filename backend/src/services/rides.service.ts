import prisma from '../db/connection';
import getCoordinates from '../utils/getCordinates';
import getRoute from '../utils/getRoutes';

class RidesService {  


  public async findAll() {
    const rides = await prisma.rides.findMany();
    return { status: 200, result: rides };
  }

  public async estimateRide(origin: string, destination: string, userId: string) {
    // console.log(origin, destination, '-------------------------')
    const from = await getCoordinates(origin)
    const to = await getCoordinates(destination)
    const routeTrajectory = await getRoute(from, to)
    // const rides = await prisma.rides.findMany();
    return { status: 200, result: routeTrajectory };
  }
}

export default RidesService;