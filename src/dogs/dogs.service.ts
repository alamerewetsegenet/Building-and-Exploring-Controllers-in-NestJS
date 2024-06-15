import { Injectable, NotFoundException } from '@nestjs/common';

export interface Dog {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class DogsService {
  private dogs: Dog[] = [];
  private idCounter: number = 1;

  getAllDogs(): Dog[] {
    return this.dogs;
  }

  createDog(name: string, age: number): Dog {
    const newDog: Dog = {
      id: this.idCounter++,
      name,
      age,
    };
    this.dogs.push(newDog);
    return newDog;
  }

  getDogById(id: number): Dog {
    const dog = this.dogs.find(d => d.id === id);
    if (!dog) {
      throw new NotFoundException('Dog not found');
    }
    return dog;
  }

  updateDog(id: number, update: { name?: string; age?: number }): Dog {
    const dog = this.getDogById(id);
    if (update.name) {
      dog.name = update.name;
    }
    if (update.age) {
      dog.age = update.age;
    }
    return dog;
  }

  deleteDog(id: number): Dog {
    const dogIndex = this.dogs.findIndex(d => d.id === id);
    if (dogIndex === -1) {
      throw new NotFoundException('Dog not found');
    }
    const [deletedDog] = this.dogs.splice(dogIndex, 1);
    return deletedDog;
  }
}
