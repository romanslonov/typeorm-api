import * as websocket from 'socket.io';
import http = require('http');

export default class SocketService {

  io: SocketIO.Server;
  users: Set<string>;
  socket: SocketIO.Socket;

  constructor(server: http.Server) {
    this.io = websocket(server);
    this.users = new Set();

    this.handleClientConnection();
  }

  handleClientConnection() {
    // this.io.use((socket, next) => {
    //   if (socket.request.headers.cookie) return next();
    //   next(new Error('Authentication error'));
    // });
    this.io.on('connection', (socket) => {
      // Store in cache
      this.socket = socket;
      this.users.add(socket.id);
      console.log('a user connected', this.users.size);

      this.io.emit('welcome message', { message: `Welcome to the chat, your uniq id: ${socket.id}` });

      socket.on('disconnect', () => {
        // Remove from cache
        this.users.delete(socket.id);
        console.log('a user disconnected', this.users.size);
      });
    });
  }

  public getIO(): SocketIO.Server {
    return this.io;
  }

  public getSocket(): SocketIO.Socket {
    return this.socket;
  }

  public getUsers(): Set<string> {
    return this.users;
  }

};
