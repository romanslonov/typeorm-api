// import { getRepository, Like } from 'typeorm';
// import { NextFunction, Request, Response } from 'express';
import { OK, CREATED } from 'http-status';
import { User } from '../entity/User';
// import NotFoundException from '../exception/NotFoundException';
// import UserAlreadyExistsException from '../exception/UserAlreadyExistsException';
// import RequestExtended from '../interface/RequestExtended';

import { DefaultContext } from 'koa';

export async function profile(ctx: DefaultContext) {
  const user = await User.findOne({ id: ctx.state.user.id });

  ctx.status = OK;
  ctx.body = { user };
};

// export class UserController {

//   static async all(request: Request, response: Response) {
//     const userRepository = getRepository(User);
//     const users = await userRepository.find();
//     return response.status(OK).json({ users });
//   }

//   static async one(request: Request, response: Response, next: NextFunction) {
//     try {
//       const userRepository = getRepository(User);
//       const user = await userRepository.findOne(request.params.id);
//       if (!user) {
//         return NotFoundException(response);
//       }
//       return response.status(OK).json({ user });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async profile(request: RequestExtended, response: Response, next: NextFunction) {
//     try {
//       return response.status(OK).json({ user: request.user });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async search(request: RequestExtended, response: Response, next: NextFunction) {
//     try {
//       const userRepository = getRepository(User);
//       const users = userRepository.find({ email: Like(`%${request.query.email}%`) });

//       return response.status(OK).json({ users });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async save(request: Request, response: Response, next: NextFunction) {
//     try {
//       const userRepository = getRepository(User);

//       if (await userRepository.findOne({ email: request.body.email })) {
//         return UserAlreadyExistsException(response, request.body.email);
//       }

//       const user = await userRepository.save(request.body);
//       return response.status(CREATED).json({ user });
//     } catch (error) {
//       next(error);
//     }
//   }

// }
