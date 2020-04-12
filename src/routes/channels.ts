import Router from 'koa-router';
import { create, getMessagesByChannel } from '../controller/channel';
import { Channel } from '../entity/Channel';
import validationMiddleware from '../middleware/validate';
import authorizeMiddleware from '../middleware/authorize';

const router = new Router();

router.get('/channels/:id/messages', authorizeMiddleware, getMessagesByChannel);
router.post('/channels', authorizeMiddleware, validationMiddleware(Channel), create);

export default router;
