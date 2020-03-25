import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User";
import {Room} from "./Room";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => Room, room => room.messages)
    room: Room;

    @ManyToOne(type => User, user => user.messages)
    user: User;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;
    
}