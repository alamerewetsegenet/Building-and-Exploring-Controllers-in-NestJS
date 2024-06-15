import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DogsService, Dog } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  getAllDogs(): Dog[] {
    return this.dogsService.getAllDogs();
  }

  @Post()
  createDog(@Body() body: { name: string; age: number }): Dog {
    return this.dogsService.createDog(body.name, body.age);
  }

  @Get(':id')
  getDogById(@Param('id') id: number): Dog {
    return this.dogsService.getDogById(id);
  }

  @Put(':id')
  updateDog(@Param('id') id: number, @Body() body: { name?: string; age?: number }): Dog {
    return this.dogsService.updateDog(id, body);
  }

  @Delete(':id')
  deleteDog(@Param('id') id: number): Dog {
    return this.dogsService.deleteDog(id);
  }
}
