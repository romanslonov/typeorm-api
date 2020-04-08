export function listen(socket, io) {
  socket.on('START_TYPING', ({ roomId, user }) => {
    socket.broadcast.to(roomId).emit('START_TYPING', { user });
    console.log(user.firstName + ' typing...');
  });

  socket.on('STOP_TYPING', ({ roomId, user }) => {
    socket.broadcast.to(roomId).emit('STOP_TYPING', { user });
    console.log(user.firstName + ' stoped typing.')
  });
}
