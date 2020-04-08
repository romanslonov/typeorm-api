// import * as redis from 'redis';

class CacheService {

  users: Map<number, SocketIO.Socket>;

  constructor() {
    this.users = new Map();
  }

  public add(id: number, socket: SocketIO.Socket) {
    this.users.set(id, socket);
  }

  public get(id: number) {
    return this.users.get(id);
  }

  public delete(id: number) {
    this.users.delete(id);
  }

  public count(): number {
    return this.users.size;
  }

  public getUsers(): Map<number, SocketIO.Socket> {
    return this.users;
  }

};

export default new CacheService();
