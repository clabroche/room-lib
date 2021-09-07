class Room {
  static Game = null 
  constructor(roomId, creatorId) {
    this.id = roomId
    this.creatorId = creatorId
    /** @type {import('./User')[]} */
    this.users = []
    this.game = new Room.Game()
  }
  /** @param {import('./User')} user */
  join(user) {
    if (!this.hasAlreadyUser(user.username)) {
      this.users.push(user)
    }
  }
  /** @param {import('./User')} user */
  unjoin(user) {
    this.users = this.users.filter(_user => _user.username !== user.username)
  }
  /** @param {String} username */
  hasAlreadyUser(username) {
    const user = this.getUserFromUsername(username)
    return username === this.creatorId || user ? true : false
  }
  /** @param {String} username */
  getUserFromUsername(username) {
    return this.users.filter(user => user.username === username).pop()
  }

}

module.exports = Room