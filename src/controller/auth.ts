import { getRepository } from 'typeorm';
import { DefaultContext } from 'koa';
import { OK, CREATED, BAD_REQUEST } from 'http-status';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from '../service/bcrypt';

export async function signin(ctx: DefaultContext) {
  const { email } = ctx.request.body;
  const userRepository = getRepository(User);

  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password')
    .getOne();

  console.log(user);

  ctx.assert(
    await bcrypt.comparePassword(ctx.request.body.password, user.password),
    BAD_REQUEST, 'Email or password is wrong',
  );

  user.lastLoginTime = new Date();
  await userRepository.save(user);

  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.tokenExpiresTime });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...transformedUser } = user;

  ctx.status = OK;
  ctx.body = { user: transformedUser, token };
};

export async function signup(ctx: DefaultContext) {
  const { email, password } = ctx.request.body;
  const userRepository = getRepository(User);

  const match = await userRepository.findOne({ email });
  ctx.assert(!match, BAD_REQUEST, 'Username already taken.');

  const hash = await bcrypt.password(password);
  const user = await userRepository.save({ ...ctx.request.body, password: hash });
  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.tokenExpiresTime });

  ctx.status = CREATED;
  ctx.body = { user, token };
};
