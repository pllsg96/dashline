import prisma from '../db/connection';
import getCoordinates from '../utils/getCordinates';

class RidesService {  


  public async findAll() {
    const rides = await prisma.rides.findMany();
    return { status: 200, result: rides };
  }

  public async estimateRide(address: string) {
    const from = await getCoordinates(address)
    // const rides = await prisma.rides.findMany();
    return { status: 200, result: from };
  }
}

export default RidesService;