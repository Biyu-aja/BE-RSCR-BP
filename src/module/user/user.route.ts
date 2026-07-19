import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.post('/', userController.createuser);
router.get('/', userController.findAlluser);
router.get('/:id', userController.finduserById);
router.put('/:id', userController.updateuser);
router.delete('/:id', userController.deleteuser);

export default router;
