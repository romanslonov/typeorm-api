import Router from 'koa-router';
import { profile } from '../controller/user';
import authorizeMiddleware from '../middleware/authorize';

const router = new Router();

router.get('/profile', authorizeMiddleware, profile);

export default router;
