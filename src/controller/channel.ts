import { OK, CREATED } from 'http-status';
import { Channel } from '../entity/Channel';
import { User } from '../entity/User';
import { Message } from '../entity/Message';
import { DefaultContext } from 'koa';

export async function create(ctx: DefaultContext) {
  const channel = new Channel();
  channel.author = ctx.state.user;
  channel.users = [channel.author];

  await channel.save();

  ctx.status = CREATED;
  ctx.body = { channel };
}

export async function getAll(ctx: DefaultContext) {
  const user = await User.findOne({ where: { id: ctx.state.user.id }, relations: ['channels'] });

  ctx.status = OK;
  ctx.body = { channels: user.channels };
}

export async function getMessagesByChannel(ctx: DefaultContext) {
  const { id } = ctx.params;
  const messages = await Message.find({ where: [{ channel: id }], relations: ['user'] });

  ctx.status = OK;
  ctx.body = { messages };
}


// export class RoomController {

//   static async messages(request: Request, response: Response, next: NextFunction) {
//     try {
//       const roomRepository = getRepository(Room);
//       const messageRepository = getRepository(Message);

//       const room = await roomRepository.findOne(request.params.id);
//       const messages = await messageRepository.find({ where: [{ room }], relations: ['user'] });

//       return response.status(OK).json({ messages });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async all(request: RequestExtended, response: Response, next: NextFunction) {
//     try {
//       const roomRepository = getRepository(Room);
//       // const userRepository = getRepository(User);

//       // const user = userRepository.findOne(request.user.id);
//       const rooms = await roomRepository.find({
//         where: { user: request.user.id },
//         relations: ['author', 'users'],
//       });

//       return response.status(OK).json({ rooms });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async one(request: Request, response: Response, next: NextFunction) {
//     const roomRepository = getRepository(Room);
//     return roomRepository.findOne(request.params.id, { relations: ['author', 'users'] });
//   }

//   static async join(request: Request, response: Response, next: NextFunction) {
//     const roomRepository = getRepository(Room);
//     const userRepository = getRepository(User);
//     const room = await roomRepository.findOne(request.params.id, { relations: ['users'] });
//     const user = await userRepository.findOne(request.body.user.id);

//     room.users.push(user);

//     return roomRepository.save(room);
//   }

//   static async save(request: Request, response: Response, next: NextFunction) {
//     const roomRepository = getRepository(Room);
//     const userRepository = getRepository(User);

//     const user = await userRepository.findOne(request.body.author.id);
//     const room = new Room();

//     room.author = user;
//     room.users = [user];

//     return roomRepository.save(room);
//   }

//   // async remove(request: Request, response: Response, next: NextFunction) {
//   //     let userToRemove = await this.userRepository.findOne(request.params.id);
//   //     await this.userRepository.remove(userToRemove);
//   // }

// }
