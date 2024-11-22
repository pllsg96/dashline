import prisma from '../db/connection';

class ReviewsService {  


  public async findAll() {

    const reviews = await prisma.reviews.findMany();
    return { status: 200, result: reviews };
  }
}

export default ReviewsService;