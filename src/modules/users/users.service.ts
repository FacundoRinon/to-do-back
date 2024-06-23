import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  findAll(): any[] {
    // Retorna todos los usuarios
    return this.users;
  }

  findOne(id: number): any {
    // Retorna un usuario por su ID
    return this.users.find((user) => user.id === id);
  }

  create(user: any): any {
    // Crea un nuevo usuario
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: any): any {
    // Actualiza un usuario existente
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null;
  }

  remove(id: number): any {
    // Elimina un usuario por su ID
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users[index];
      this.users.splice(index, 1);
      return deletedUser;
    }
    return null;
  }
}
