import { DefaultContext } from 'koa';
import { Channel } from '../entity/Channel';
import { Message } from '../entity/Message';
import { CREATED } from 'http-status';
import CacheService from '../service/Cache';

export async function create(ctx: DefaultContext) {
  const { type, content } = ctx.request.body;
  const user = ctx.state.user;
  const channel = await Channel.findOne(ctx.request.body.channelId);
  const message = new Message();

  message.user = user;
  message.channel = channel;
  message.type = type;
  message.content = content;

  await message.save();

  const socket = CacheService.get(ctx.request.body.userId);

  if (socket) {
    socket.broadcast.to(ctx.request.body.channelId).emit('NEW_MESSAGE', message);
  }

  ctx.status = CREATED;
  ctx.body = { message };
}
