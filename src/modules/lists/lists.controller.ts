import { Controller, Get } from '@nestjs/common';
import { ListsService } from './lists.service';

@Controller('/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll(): object {
    return this.listsService.findAll();
  }
}
