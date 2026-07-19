import prisma from '../../config/db';
import { User } from '@prisma/client';

export const createuser = async ( data : Omit<User, 'id'>) => {
  return prisma.user.create({ data });
}

export const findAlluser = async () => {
  return prisma.user.findMany();
}

export const finduserById = async ( id: string ) => {
  return prisma.user.findUnique({
    where: { id }
  })
} 

export const updateuser = async ( id: string, data: Omit<User, 'id'>) => {
  return prisma.user.update({ 
    where: { id },
    data
   });
}

export const deleteuser = async ( id: string) => {
  return prisma.user.delete({ where : { id } });
}