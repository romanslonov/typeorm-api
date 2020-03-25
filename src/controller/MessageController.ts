import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Room} from "../entity/Room";
import {User} from "../entity/User";
import {Message} from "../entity/Message";

export class MessageController {

    private roomRepository = getRepository(Room);
    private userRepository = getRepository(User);
    private messageRepository = getRepository(Message);

    async all(request: Request, response: Response, next: NextFunction) {

        return this.messageRepository.find({relations: ["user", "room"]});
    }

    async save(request: Request, response: Response, next: NextFunction) {

        const user = await this.userRepository.findOne(request.body.user.id);
        const room = await this.roomRepository.findOne(request.body.room.id, {relations: ["messages"]});
        const message = new Message();

        console.log(room);

        message.user = user;
        message.room = room;
        message.text = request.body.text;

        return this.messageRepository.save(message);
    }

}