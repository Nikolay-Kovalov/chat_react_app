const express = require('express');
const ws = require('socket.io');


const app = express();
const server = require('http').Server(app);
const io = ws(server)

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
    const { id: roomId } = req.params;
       console.log(roomId)
    const obj = rooms.has(roomId)
        ? {
            users: [...rooms.get(roomId).get('users').values()],
            messages: [...rooms.get(roomId).get('messages').values()]
        }
        : { users: [], messages: [] };
    
    res.json(obj)

});

app.post('/rooms', (req, res) => {
    const { roomId, name } = req.body
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []]
            ])
        )
        console.log(rooms)
    }
    res.send()

});

console.log(rooms)


io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', (data) => {
        socket.join(data.roomId)
        rooms.get(data.roomId).get('users').set(socket.id, data.name)
        const users = [...rooms.get(data.roomId).get('users').values()];
        socket.to(data.roomId).emit('ROOM:SET_USERS', users)
    });
    socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
        if (value.get('users').delete(socket.id)) {
            const users = [...value.get('users').values()];
       socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users) 
        }
    })
})
});



server.listen(8888, (err) => {
    if (err) {
        throw Error(err)  
    }
  
    console.log('Server is running')

})