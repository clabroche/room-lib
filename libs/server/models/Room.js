class Room {
  static Game = null 
  constructor(roomId, creatorId) {
    this.id = roomId
    this.creatorId = creatorId
    /** @type {import('./User')[]} */
    this.users = []
    this.game = new Room.Game()
    this.scoring = []
  }
  /** @param {import('./User')} user */
  join(user) {
    if (!this.hasAlreadyUser(user.username)) {
      this.users.push(user)
    }
    if(!this.scoring.find((score => score.username === user.username))){
      this.scoring.push({username: user.username, score: 0})
    }
  }
  /** @param {import('./User')} user */
  unjoin(user) {
    this.users = this.users.filter(_user => _user.username !== user.username)
    this.scoring = this.scoring.filter(_user => _user.username !== user.username)
  }
  /** @param {String} username */
  hasAlreadyUser(username) {
    return this.getUserFromUsername(username)
  }
  /** @param {String} username */
  getUserFromUsername(username) {
    return this.users.filter(user => user.username === username).pop()
  }

}

module.exports = Room