import prisma from '../../config/db';

export class UserRepository {
  async findAll() {
    return prisma.user.findMany();
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return prisma.user.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
