import prisma from '../db/connection';

class RidesService {  


  public async findAll() {
    const rides = await prisma.rides.findMany();
    return { status: 200, result: rides };
  }

  public async estimateRide() {
    const rides = await prisma.rides.findMany();
    return { status: 200, result: rides };
  }
}

export default RidesService;