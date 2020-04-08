import { Router } from 'express';
import { UserController } from '../controller/user';
import { User } from '../entity/User';
import validationMiddleware from '../middleware/validate';
import authorize from '../middleware/authorize';

const router = Router();

router.get('/', authorize,  UserController.search);
router.get('/:id', authorize, UserController.one);
router.post('/', authorize, validationMiddleware(User), UserController.save);

export default router;
