const Room = require('./Room')

module.exports = {
  /** @type {Object<String, import('./Room')>} */
  rooms: {},
  /**
   * @param {import('./Room') | String} roomOrRoomId 
   * @return {Boolean}
   */
  isRoomExist(roomOrRoomId) {
    const room = this.getRoomFromId(roomOrRoomId)
    return room ? true : false
  },
  /**
   * @param {String} roomId 
   * @param {String} username 
   */
  getOrCreate(roomId, username) {
    if (this.isRoomExist(roomId)) {
      return this.getRoomFromId(roomId)
    } else {
      const room = new Room(roomId, username)
      this.rooms[room.id] = room
      return room
    }
  },
  /**
   * @param {String} roomId 
   */
  get(roomId) {
    return this.getRoomFromId(roomId)
  },
  /**
   * @param {import('./Room') | String} roomOrRoomId 
   * @return {import('./Room')}
   */
  getRoomFromId(roomOrRoomId) {
    if (typeof roomOrRoomId === 'string') {
      return this.rooms[roomOrRoomId]
    } else if (roomOrRoomId && typeof roomOrRoomId === 'object' && roomOrRoomId.id) {
      return this.rooms[roomOrRoomId.id]
    }
  },
    /**
   * @param {String} username 
   * @return {import('./Room')}
   */
  getRoomFromUsername(username) {
    return Object.keys(this.rooms)
      .map(roomId => this.rooms[roomId])
      .filter(room => {
        /** @type {import('./User')[]} */
        const usersInRoom = room.users
        if(usersInRoom) {
          const usersname = usersInRoom.map(user => user.username)
          return usersname.includes(username)
        }
      })
      .pop()
  }
}