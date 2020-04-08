import { Router } from 'express';
import { UserController } from '../controller/user';
import authorize from '../middleware/authorize';

const router = Router();

router.get('/profile', authorize,  UserController.profile);

export default router;
