import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ListsService } from './lists.service';

interface RequestBody {
  user_id: number;
}

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

  @Get(':id')
  async findListById(
    @Param('id') listId: string,
    @Query('user_id') userId: string,
  ) {
    return this.listsService.findListById(Number(listId), Number(userId));
  }
}
