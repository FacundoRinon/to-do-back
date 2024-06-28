import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): object {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() taskData: any): Promise<any> {
    return this.tasksService.create(taskData);
  }
}
