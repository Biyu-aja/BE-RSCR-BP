"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = __importDefault(require("../../config/db"));
class UserRepository {
    async findAll() {
        return db_1.default.user.findMany();
    }
    async findById(id) {
        return db_1.default.user.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return db_1.default.user.create({
            data,
        });
    }
    async update(id, data) {
        return db_1.default.user.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return db_1.default.user.delete({
            where: { id },
        });
    }
}
exports.UserRepository = UserRepository;
