import Router from 'koa-router';
import { create, getMessagesByRoom } from '../controller/room';
import { Room } from '../entity/Room';
import validationMiddleware from '../middleware/validate';
import authorizeMiddleware from '../middleware/authorize';

const router = new Router();

// router.get('/', authorize,  RoomController.all);
// router.get('/:id', authorize, RoomController.one);
router.get('/rooms/:id/messages', authorizeMiddleware, getMessagesByRoom);
router.post('/rooms', authorizeMiddleware, validationMiddleware(Room), create);

export default router;
