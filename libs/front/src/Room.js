import Socket from './Socket'
import api from './API'

class Room {
  constructor(room) {
    this.id = room.id
    this.users = room.users
    this.game = room.game
    this.creatorId = room.creatorId
    Socket.socket.on("update:users", users => {
      if (users && Array.isArray(users)) {
        return this.users = users
      }
      return this.users = [];
    });
    Socket.socket.on("update:game", game => {
      if (game) {
        return this.game = game
      }
    })
    Socket.socket.on("update:creatorId", creatorId => {
      console.log('update creator')
      if (creatorId) {
        return this.creatorId = creatorId
      }
    });
    Socket.socket.on("error", (data) => {
      alert(data);
    })
  }
  static async getRoom(roomId) {
    const { data: room } = await api.instance.get(`/api/rooms/${roomId}`)
    if (room) return new Room(room)
  }
  static async createRoom(username, roomId) {
    const { data: room } = await api.instance.post(roomId ? `/api/rooms/create/${username}/${roomId}` : `/api/rooms/create/${username}`)
    if (room) return new Room(room)
  }
  static async joinExistingRoom(roomId, username) {
    const { data: room } = await api.instance.post(`/api/rooms/join/${roomId}/${username}`)
    if (room) return new Room(room)
  }
}

export default Room