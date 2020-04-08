import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import http from 'http';
import socketIO from 'socket.io';
import router from './routes';
import errorMiddleware from './middleware/error';
import loggerMiddleware from './middleware/logger';
import undefinedEndpointMiddleware from './middleware/undefinedEndpoint';
import authorizeSocketMiddleware from './socket/middleware/authorize';
import config from './config';

dotenv.config();

createConnection().then(async () => {
  const app = new Koa();
  const server = http.createServer(app.callback());

  const io = socketIO(server);
  io.use(authorizeSocketMiddleware);
  io.on('connection', (socket) => {
    import('./socket/connection').then(({ listen }) => listen(socket, io))
    import('./socket/message').then(({ listen }) => listen(socket, io));
  });

  app.use(async (ctx, next) => {
    ctx.state.io = io;
    await next();
  });

  app.use(bodyParser());
  app.use(helmet());
  app.use(cors());
  app.use(errorMiddleware);
  app.use(loggerMiddleware);

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.use(undefinedEndpointMiddleware);

  app.on('error', (error) => console.log(error));

  app.listen(config.port, () => {
    console.log(`DB connected and server up and running on ${config.port}'`);
  });
}).catch(error => console.log(error));
