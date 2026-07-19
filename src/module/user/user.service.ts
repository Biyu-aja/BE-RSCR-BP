import { UserRepository } from './user.repository';

export class UserService {
  private userRepository = new UserRepository();

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: number) {
    return this.userRepository.findById(id);
  }

  async createUser(data: any) {
    return this.userRepository.create(data);
  }

  async updateUser(id: number, data: any) {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
