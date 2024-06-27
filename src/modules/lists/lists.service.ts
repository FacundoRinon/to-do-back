import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.list.findMany();
  }

  async create(data: any) {
    const { title, type, deadline, user_id } = data;
    let newList;

    try {
      newList = await this.prisma.list.create({
        data: {
          title,
          type,
          deadline,
        },
      });
    } catch (error) {
      throw new Error(`Error creating list: ${error.message}`);
    }

    try {
      await this.prisma.userList.create({
        data: {
          user_id,
          list_id: newList.list_id,
        },
      });
    } catch (error) {
      await this.prisma.list.delete({
        where: {
          list_id: newList.list_id,
        },
      });
      throw new Error(`Error creating UserList entry: ${error.message}`);
    }

    return newList;
  }
}
