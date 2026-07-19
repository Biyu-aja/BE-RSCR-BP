"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
class UserController {
    userService = new user_service_1.UserService();
    getAll = async (req, res) => {
        try {
            const data = await this.userService.getAllUsers();
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const parsedId = Number(id);
            const data = await this.userService.getUserById(parsedId);
            if (!data) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
    create = async (req, res) => {
        try {
            const data = await this.userService.createUser(req.body);
            return res.status(201).json(data);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const parsedId = Number(id);
            const data = await this.userService.updateUser(parsedId, req.body);
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const parsedId = Number(id);
            await this.userService.deleteUser(parsedId);
            return res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
}
exports.UserController = UserController;
