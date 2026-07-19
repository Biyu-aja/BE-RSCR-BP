"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("./user.repository");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    async getAllUsers() {
        return this.userRepository.findAll();
    }
    async getUserById(id) {
        return this.userRepository.findById(id);
    }
    async createUser(data) {
        return this.userRepository.create(data);
    }
    async updateUser(id, data) {
        return this.userRepository.update(id, data);
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
}
exports.UserService = UserService;
