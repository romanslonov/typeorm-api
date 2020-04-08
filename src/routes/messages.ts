import Router from 'koa-router';
import { create } from '../controller/message';
import { Message } from '../entity/Message';
import validateMiddleware from '../middleware/validate';
import authorizeMiddleware from '../middleware/authorize';

const router = new Router();

// router.get('/', authorizeMiddleware,  UserController.all);
// router.get('/:id', authorizeMiddleware, UserController.one);
router.post('/messages', authorizeMiddleware, validateMiddleware(Message), create);

export default router;
