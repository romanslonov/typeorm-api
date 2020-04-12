import Router from 'koa-router';
import { User } from '../entity/User';
import Login from '../dto/Login';
import { signup, signin } from '../controller/auth';
import validateMiddleware from '../middleware/validate';

const router = new Router();

router.post('/signup', validateMiddleware(User), signup);
router.post('/signin', validateMiddleware(Login), signin);

export default router;
