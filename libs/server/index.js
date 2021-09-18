module.exports = {
  controllers: {
    /** @type {'/:username/:roomId'} */
    roomBaseUrl: '/:username/:roomId',
    routes: require('./controllers/room'),
  },
  models: {
    User: require('./models/User'),
    Users: require('./models/Users'),
    Room: require('./models/Room'),
    Rooms: require('./models/Rooms'),
  },
  sockets: require('./sockets')
}