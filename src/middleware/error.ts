import { HttpError } from 'http-errors';
import { DefaultContext, Next } from 'koa';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';

export default async (ctx: DefaultContext, next: Next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = BAD_REQUEST;
      ctx.body = {
        status: BAD_REQUEST,
        message: error.message,
      }
      return;
    }
    ctx.status = INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: INTERNAL_SERVER_ERROR,
      message: 'Something goes wrong on our end 😲.',
    };
    ctx.app.emit('error', error, ctx);
  }
}
