global.Olm = require('olm')
const sdk = require('matrix-js-sdk')
const express = require('express')
const config = require('./config.json')
const START_TIME = + new Date()

let client = sdk.createClient({
  baseUrl: config.baseUrl,
  accessToken: config.accessToken,
  userId: config.userId
})

client.on('Room.timeline', function(event, room, toStartOfTimeline) {
  if (event.getTs() > START_TIME) {
    if (room.roomId === config.roomId) {
      if (event.getSender() !== config.userId) {
        client.sendTextMessage(config.roomId, 'lol kek')
      }
    }
  }
})

client.startClient()

const app = express()

app.get('/', (req, res) => {
  client.sendTextMessage(config.roomId, req.query.message)
  res.send('ok')
})

app.listen(config.port)
