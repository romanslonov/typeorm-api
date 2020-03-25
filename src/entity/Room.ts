import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany} from "typeorm";
import {User} from "./User";
import {Message} from "./Message";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, {cascade: true})
    @JoinColumn()
    author: User;

    @ManyToMany(type => User, user => user.rooms, {cascade: true})
    users: User[];

    @OneToMany(type => Message, message => message.room)
    messages: Message[];

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;

}