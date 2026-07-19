import { Request, Response } from 'express';
import * as userService from './user.service';
import { User } from '@prisma/client';

export const createuser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await userService.createuser(data);
    res.status(201).json({ success: true, data: result });
  }
  catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export const findAlluser = async (req: Request, res: Response) => {
  try {
    const result = await userService.findAlluser();
    res.status(200).json({ success: true, data: result });
  }
  catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export const finduserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await userService.finduserById(id);
    res.status(200).json({ success: true, data: result });
  }
  catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export const updateuser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const result = await userService.updateuser(id, data);
    res.status(200).json({ success: true, data: result });
  }
  catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export const deleteuser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await userService.deleteuser(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  }
  catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}