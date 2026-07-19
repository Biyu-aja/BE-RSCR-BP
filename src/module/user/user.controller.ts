import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService = new UserService();

  getAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = await this.userService.getAllUsers();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const parsedId = Number(id);
      const data = await this.userService.getUserById(parsedId);
      
      if (!data) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = await this.userService.createUser(req.body);
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const parsedId = Number(id);
      const data = await this.userService.updateUser(parsedId, req.body);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const parsedId = Number(id);
      await this.userService.deleteUser(parsedId);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
