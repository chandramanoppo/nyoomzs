const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server,{
  cors: {
    origin: "http://localhost:5173"
  }
})
const { v4: uuidV4 } = require('uuid')
const cors = require('cors')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.status(200).json({path:`/${uuidV4()}`})
})

app.get('/:room', (req, res) => {
    res.status(200).json({room_id:req.params.room})
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

server.listen(3000,()=>{
    console.log(`Listening at 3000`);
})