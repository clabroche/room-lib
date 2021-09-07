/**
 *  
 * @param {String} username 
 */
function User(username) {
  /** @type {String} */
  this.username = username
  /** @type {String} */
  this.socketId = null
}


module.exports = User