import CacheService from '../service/Cache';

export async function listen(socket, io) {
  /**
   * Save user to cache
   */
  socket.user.rooms.forEach(room => socket.join(room.id));
  CacheService.add(socket.user.id, socket);
  console.log('connected user email', socket.user.email);
  console.log('online now: ', CacheService.count());

  socket.on('disconnect', () => {
    CacheService.delete(socket.user.id);
    console.log('user disconnected id', socket.id)
  });
}
