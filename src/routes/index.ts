import Router from 'koa-router';
import authRoutes from './auth';
import roomsRoutes from './rooms';
import messagesRoutes from './messages';

const router = new Router({ prefix: '/api/v1' });

router.use(authRoutes.routes(), authRoutes.allowedMethods());
router.use(roomsRoutes.routes(), roomsRoutes.allowedMethods());
router.use(messagesRoutes.routes(), messagesRoutes.allowedMethods());

export default router;
