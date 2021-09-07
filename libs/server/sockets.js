const Socket = require('socket.io');
const Rooms = require('./models/Rooms');
const Users = require('./models/Users')
module.exports = {
  /** @type {import('socket.io').Server} */
  io: null,
  connect(server) {
    const io = Socket(server);
    this.io = io
    this.io.on('connect', (socket) => {
      socket.on('connectRoom', (username, roomId) => {
        Users.linkSocket(username, socket)
        const user = Users.getUserFromId(username)
        const room = Rooms.getRoomFromId(roomId)
        room.join(user)
        this.joinRoom(room.id, user)
        this.updateUsers(room.id, room.users)
      })
      socket.on('disconnect', () => {
        const user = Users.getUserFromSocket(socket)
        if(user){
          const room = Rooms.getRoomFromUsername(user.username)
          if(room) {
            room.unjoin(user)
            this.updateUsers(room.id, room.users)
          }
        }
      })
    })
  },
  updateUsers(roomId, users) {
    this.io.to(roomId).emit('update:users', users)
  },
  updateGame(room) {
    this.io.to(room.id).emit('update:game', room.game)
  },
  updateCreator(roomId, creatorId) {
    this.io.to(roomId).emit('update:creatorId', creatorId)
  },
  /**
   * @param {String} roomId 
   * @param {import('./models/User')} user 
   */
  joinRoom(roomId, user){
    if (user.socketId) {
      const socket = Object.keys(this.io.sockets.sockets)
        .map(socketId => this.io.sockets.sockets[socketId])
        .filter(socket => socket.id === user.socketId)
        .pop()
      socket.join(roomId)
    }
  }
}
