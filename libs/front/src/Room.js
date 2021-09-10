import Socket from './Socket'
import api from './API'
import {ref} from "vue"
class Room {
  constructor(room) {
    this.id = room.id
    this.users = ref(room.users)
    this.game = ref(room.game || {})
    this.scoring = ref(room.scoring || [])
    this.creatorId = ref(room.creatorId)
    Socket.socket.on("update:users", users => {
      if (users && Array.isArray(users)) {
        return this.users.value = users
      }
      return this.users.value = [];
    });
    Socket.socket.on("update:scoring", scoring => {
      if (scoring) {
        return this.scoring.value = scoring
      }
      return this.scoring.value = [];
    });
    Socket.socket.on("update:game", game => {
      if (game) {
        return this.game.value = game
      }
    })
    Socket.socket.on("update:creatorId", creatorId => {
      if (creatorId) {
        return this.creatorId.value = creatorId
      }
    });
    Socket.socket.on("error", (data) => {
      alert(data);
    })
  }
  static async getRoom(roomId) {
    const { data: room } = await api.instance.get(`/api/rooms/${roomId}`)
    if (room) return new this(room)
  }
  static async createRoom(username, roomId) {
    const { data: room } = await api.instance.post(roomId ? `/api/rooms/create/${username}/${roomId}` : `/api/rooms/create/${username}`)
    if (room) return new this(room)
  }
  static async joinExistingRoom(roomId, username) {
    const { data: room } = await api.instance.post(`/api/rooms/join/${roomId}/${username}`)
    if (room) return new this(room)
  }
}

export default Room