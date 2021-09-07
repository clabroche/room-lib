import RoomLib from './src/Room'
import APILib from './src/API'
import SocketLib from './src/Socket'

export const Room = RoomLib
export const API = APILib
export const Socket = SocketLib
export const initRoomLib = ({router}) => {
  router.beforeEach((to, from, next) => {
    if (to.name !== 'game' && from.name === 'game') {
      const answer = window.confirm("Voulez vous vous deconnecter ?")
      if (answer) {
        SocketLib.socket.emit('leave room', from.params.room)
        SocketLib.socket.emit('updateUser', { roomId: from.params.room })
        next()
      } else {
        next(false)
      }
    } else next()
  })
}
