import prisma from '../db/connection';

class DriversService {  


  public async findAll() {
    const drivers = await prisma.drivers.findMany();
    return { status: 200, result: drivers };
  }
}

export default DriversService;