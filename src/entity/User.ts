import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {Message} from "./Message";
import {Room} from "./Room";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(type => Message, message => message.user)
    messages: Message[];

    @ManyToMany(type => Room, room => room.users)
    @JoinTable()
    rooms: Room[];

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;

}
