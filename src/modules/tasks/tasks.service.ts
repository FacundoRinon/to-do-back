import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async create(data: any) {
    const { title, description, date, user_id, list_id } = data;
    let newTask;

    try {
      newTask = await this.prisma.task.create({
        data: {
          title,
          description,
          dateToComplete: date,
        },
      });
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }

    try {
      await this.prisma.userTask.create({
        data: {
          user_id,
          task_id: newTask.task_id,
        },
      });
    } catch (error) {
      await this.prisma.task.delete({
        where: {
          task_id: newTask.task_id,
        },
      });
      throw new Error(`Error creating UserTask entry: ${error.message}`);
    }

    try {
      await this.prisma.listTask.create({
        data: {
          list_id,
          task_id: newTask.task_id,
        },
      });
    } catch (error) {
      await this.prisma.task.delete({
        where: {
          task_id: newTask.task_id,
        },
      });
      throw new Error(`Error creating ListTask entry: ${error.message}`);
    }

    return newTask;
  }
}
