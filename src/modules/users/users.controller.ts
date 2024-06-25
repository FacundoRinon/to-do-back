import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): object {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() userData: any): Promise<any> {
    return this.usersService.create(userData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id, 10);
    return this.usersService.findOne(userId);
  }
}
