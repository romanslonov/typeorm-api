import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, BaseEntity } from 'typeorm';
import { User } from './User';
import { Message } from './Message';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  author: User;

  @ManyToMany(() => User, user => user.rooms, { cascade: true })
  users: User[];

  @OneToMany(() => Message, message => message.room)
  messages: Message[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: string;

  @Column({ type: 'timestamp', default: () => null, nullable: true })
  lastUpdateTime: Date;
}
