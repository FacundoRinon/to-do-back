import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity'; // Asegúrate de importar correctamente tu entidad User

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Aquí puedes definir métodos personalizados para operaciones adicionales si es necesario
}
