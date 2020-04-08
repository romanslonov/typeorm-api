import { DefaultContext } from 'koa';
import { Room } from '../entity/Room';
import { Message } from '../entity/Message';
import { OK, CREATED } from 'http-status';
import CacheService from '../service/Cache';

export async function create(ctx: DefaultContext) {
  const { type, content } = ctx.request.body;
  const user = ctx.state.user;
  const room = await Room.findOne(ctx.request.body.roomId);
  const message = new Message();

  message.user = user;
  message.room = room;
  message.type = type;
  message.content = content;

  await message.save();

  const socket = CacheService.get(ctx.request.body.userId);

  if (socket) {
    socket.broadcast.to(ctx.request.body.roomId).emit('NEW_MESSAGE', message);
  }

  ctx.status = CREATED;
  ctx.body = { message };
}
