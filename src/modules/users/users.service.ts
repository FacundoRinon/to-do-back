import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Ajusta la ruta según tu estructura de carpetas

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { user_id: id },
    });
  }

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return this.prisma.user.update({
      where: { user_id: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { user_id: id },
    });
  }
}
