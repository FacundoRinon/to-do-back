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

  async findListById(listId: number, userId: number) {
    const list = await this.prisma.list.findUnique({
      where: {
        list_id: listId,
      },
    });

    const author = await this.prisma.userList.findFirst({
      where: {
        list_id: listId,
        user_id: userId,
      },
    });
    if (author.user_id === userId) {
      return list;
    } else {
      return 'invalid';
    }

    // const userListsIds = await this.prisma.userList.findMany({
    //   where: {
    //     user_id: userId,
    //   },
    // });

    // const listIds = userListsIds.map((userList: any) => userList.list_id);

    // const lists = await this.prisma.list.findMany({
    //   where: {
    //     list_id: {
    //       in: listIds,
    //     },
    //   },
    // });
  }
}
