import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { DefaultContext, Next } from 'koa';
import { BAD_REQUEST } from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateMiddleware(type: any) {
  return async (ctx: DefaultContext, next: Next) => {
    const errors: ValidationError[] = await validate(plainToClass(type, ctx.request.body));
    if (errors.length > 0) {
      const messages = errors.map((error) => ({
        field: error.property,
        message: Object.values(error.constraints)[0],
        value: error.value,
      }));
      ctx.status = BAD_REQUEST;
      ctx.body = {
        status: BAD_REQUEST,
        messages,
      }
    } else {
      await next();
    }
  };
}

export default validateMiddleware;
