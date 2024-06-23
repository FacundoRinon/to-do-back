import { Injectable } from '@nestjs/common';

@Injectable()
export class ListsService {
  private readonly lists = [
    { id: 1, name: 'Lista de compras', elements: [] },
    { id: 2, name: 'Lista de tareas', elements: [] },
  ];

  findAll(): any[] {
    // Retorna todos los usuarios
    return this.lists;
  }

  findOne(id: number): any {
    // Retorna un usuario por su ID
    return this.lists.find((user) => user.id === id);
  }

  create(user: any): any {
    // Crea un nuevo usuario
    const newUser = { id: this.lists.length + 1, ...user };
    this.lists.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: any): any {
    // Actualiza un usuario existente
    const index = this.lists.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.lists[index] = { ...this.lists[index], ...updateUserDto };
      return this.lists[index];
    }
    return null;
  }

  remove(id: number): any {
    // Elimina un usuario por su ID
    const index = this.lists.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this.lists[index];
      this.lists.splice(index, 1);
      return deletedUser;
    }
    return null;
  }
}
