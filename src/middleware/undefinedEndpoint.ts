import { NOT_FOUND } from 'http-status';
import { DefaultContext } from 'koa';

export default async (ctx: DefaultContext) => {
  ctx.status = NOT_FOUND;
  ctx.body = {
    status: NOT_FOUND,
    message: 'Seems like the endpoint you\'re looking for no longer exists 🤔',
  };
};
