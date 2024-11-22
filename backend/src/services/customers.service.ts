import prisma from '../db/connection';

class CustomersService {  


  public async findAll() {

    const customers = await prisma.customers.findMany();
    return { status: 200, result: customers };
  }
}

export default CustomersService;