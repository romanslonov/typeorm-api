import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { User } from './User';
import { Channel } from './Channel';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  CODE = 'code',
  INVITE = 'invite',
  SYSTEM = 'system',
}

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  @IsEnum(MessageType,
    { message: `Type must be a valid enum value, one of [${Object.values(MessageType)}]`
  })
  type: MessageType

  @Column()
  @IsString({ message: 'Content should be a string.' })
  @IsNotEmpty({ message: 'Content should not be empty.' })
  content: string;

  @ManyToOne(() => Channel, channel => channel.messages)
  channel: Channel;

  @ManyToOne(() => User, user => user.messages)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => null, nullable: true })
  lastUpdateTime: Date;
}
