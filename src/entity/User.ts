import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Message } from './Message';
import { Channel } from './Channel';
import UserInterface from '../interface/User';

@Entity()
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Email is not valid.' })
  email: string;

  @Column({ select: false })
  @MinLength(6, { message: 'Password should be at least 6 characters long.' })
  @IsString({ message: 'Password should be a string.' })
  password: string;

  @Column()
  @IsString({ message: 'First name should be a string.' })
  @IsNotEmpty({ message: 'First name should not be empty.' })
  firstName: string;

  @Column()
  @IsString({ message: 'Last name should be a string.' })
  @IsNotEmpty({ message: 'Last name should not be empty.' })
  lastName: string;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @ManyToMany(() => Channel, room => room.users)
  @JoinTable()
  channels: Channel[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginTime: Date;
}
