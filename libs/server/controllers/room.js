const express = require('express');
const sockets = require('../sockets');
const Rooms = require('../models/Rooms')
const Users = require('../models/Users');
const router = express.Router();
const uuid = require('uuid').v4;
function getRoutes(Game) {
  router.get('/:roomId', (req, res, next) => {
    const { roomId } = req.params
    const room = Rooms.get(roomId)
    if(room) {
      res.json(room)
    } else {
      res.status(404).send('Room not found')
    }
  })
  router.post('/create/:username', (req, res, next) => {
    const { username } = req.params
    const roomId = uuid().split('-')[0]
    const user = Users.getOrCreate(username)
    const room = Rooms.getOrCreate(roomId, user.username)
    room.join(user)
    res.json(room)
  })
  router.post('/create/:username/:roomId', (req, res, next) => {
    const { username } = req.params
    const roomId = req.params.roomId
    const user = Users.getOrCreate(username)
    const room = Rooms.getOrCreate(roomId, user.username)
    room.join(user)
    res.json(room)
  })
  router.post('/:username/:roomId/restart', (req, res, next) => {
    const { username, roomId, } = req.params
    const user = Users.getOrCreate(username)
    const room = Rooms.getOrCreate(roomId, user.username)
    if(username !== room.creatorId) {
      room.creatorId = username
    }
    room.game = new Game()
    sockets.updateGame(room)
    sockets.updateUsers(roomId, room.users)
    sockets.updateCreator(roomId, room.creatorId)
    res.json(room)
  })
  router.post('/join/:roomId/:username', (req, res, next) => {
    const { roomId, username } = req.params
    const user = Users.getOrCreate(username)
    const room = Rooms.get(roomId)
    if (room) {
      room.join(user)
      res.json(room)
    } else {
      res.status(404).send('Room not found')
    }
  })
  return router
}

module.exports = {
  getRoutes
}