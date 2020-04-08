import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import DataStoredInToken from '../../interface/DataStoredInToken';
import config from '../../config';

export default async function(socket, next) {
  try {
    const token = socket.handshake.query.token;

    const userRepository = getRepository(User);
    const decoded = jwt.verify(token, config.jwtSecret) as DataStoredInToken;
    const user = await userRepository.findOne(decoded.id, { relations: ['rooms'] });

    if (!user) {
      return next(new Error('Authentication error.'));
    }

    socket.user = user;

    return next();
  } catch (error) {
    return next(new Error('Authentication error.'));
  }
}
