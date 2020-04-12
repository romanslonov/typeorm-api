import Router from 'koa-router';
import authRoutes from './auth';
import channelsRoutes from './channels';
import messagesRoutes from './messages';

const router = new Router({ prefix: '/api/v1' });

router.use(authRoutes.routes(), authRoutes.allowedMethods());
router.use(channelsRoutes.routes(), channelsRoutes.allowedMethods());
router.use(messagesRoutes.routes(), messagesRoutes.allowedMethods());

export default router;
