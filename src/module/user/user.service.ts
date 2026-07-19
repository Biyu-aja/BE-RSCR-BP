import * as userRepo from './user.repository';
import { User } from '@prisma/client';

export const createuser = async (data: Omit<User, 'id'>) => {
  return userRepo.createuser(data);
}

export const findAlluser = async () => {
  return userRepo.findAlluser();
}

export const finduserById = async ( id: string ) => {
  return userRepo.finduserById(id);
} 

export const updateuser = async ( id: string, data: Omit<User, 'id'>) => {
  return userRepo.updateuser(id, data);
}

export const deleteuser = async ( id: string) => {
  return userRepo.deleteuser(id);
}