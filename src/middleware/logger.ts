import { DefaultContext, Next } from 'koa';

export default async (ctx: DefaultContext, next: Next) => {
  console.log(`[logger]: ${ctx.request.method} ${ctx.request.path}`);
  await next();
};
