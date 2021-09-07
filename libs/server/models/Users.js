const User = require('./User')

module.exports = {
  /** @type {Object<String, import('./User')[]>} */
  users: {},
  /**
   * @param {String} username 
   * @return {import('./User')}
   */
  getUserFromId(username) {
    return this.users[username]
  },
  /**
   * @param {String} username
   */
  getOrCreate(username) {
    let user = this.getUserFromId(username)
    if (!user) {
      user = new User(username)
      this.users[username] = user
    }
    return user
  },
  /**
   * @param {String} username
   * @param {import('socket.io').Socket} socket
   */
  linkSocket(username, socket) {
    const user = this.getUserFromId(username)
    if (user && socket) {
      user.socketId = socket.id
    }
  },
  /**
   * @param {String} username
   * @param {import('socket.io').Socket} socket
   * @returns {import('./User')}
   */
  getUserFromSocket(socket) {
    return Object.keys(this.users)
      .map(username => this.users[username])
      .filter(user =>  user.socketId === socket.id)
      .pop()
  }
}