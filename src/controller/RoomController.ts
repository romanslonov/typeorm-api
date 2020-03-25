import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Room} from "../entity/Room";
import {User} from "../entity/User";
import {Message} from "../entity/Message";

export class RoomController {

    private roomRepository = getRepository(Room);
    private userRepository = getRepository(User);
    private messageRepository = getRepository(Message);

    async messages(request: Request, response: Response, next: NextFunction) {
        const room = await this.roomRepository.findOne(request.params.id);
        return this.messageRepository.find({where: [{room}]});
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.roomRepository.find({relations: ["author", "users"]});
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.roomRepository.findOne(request.params.id, {relations: ["author", "users"]});
    }

    async join(request: Request, response: Response, next: NextFunction) {
        const room = await this.roomRepository.findOne(request.params.id, {relations: ["users"]});
        const user = await this.userRepository.findOne(request.body.user.id);
        
        room.users.push(user);

       return this.roomRepository.save(room);
    }

    async save(request: Request, response: Response, next: NextFunction) {

        const user = await this.userRepository.findOne(request.body.author.id);
        const room = new Room();

        room.author = user;
        room.users = [user];

        return this.roomRepository.save(room);
    }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     let userToRemove = await this.userRepository.findOne(request.params.id);
    //     await this.userRepository.remove(userToRemove);
    // }

}