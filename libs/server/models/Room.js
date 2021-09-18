const cloneDeep = require('lodash.clonedeep')
function cleanRoom(room, excludeFields) {
  const clone = cloneDeep(room)
  delete clone.game.room
  excludeFields.forEach((prop) => deletePropertyPath(clone, prop))
  return clone
}

function deletePropertyPath(obj, path) {
  if (!obj || !path) return
  if (typeof path === 'string') {
    path = path.split('.');
  }
  for (var i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];
    if (typeof obj === 'undefined') return
  }
  delete obj[path.pop()];
};
class Room {
  static Game = null 
  static excludeFields = []
  constructor(roomId, creatorId) {
    this.id = roomId
    this.creatorId = creatorId
    /** @type {import('./User')[]} */
    this.users = []
    this.game = new Room.Game(this)
    this.scoring = []
  }
  clean() {
    return cleanRoom(this, Room.excludeFields)
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