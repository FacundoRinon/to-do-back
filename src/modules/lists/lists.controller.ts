import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ListsService } from './lists.service';

@Controller('/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll(): object {
    return this.listsService.findAll();
  }

  @Post()
  async create(@Body() listData: any): Promise<any> {
    return this.listsService.create(listData);
  }
}
