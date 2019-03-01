const express = require('express');
const path = require('path');

const app = express();
const socketIO = require('socket.io');

// Serve the static files from the React app
const dist = path.join(__dirname, '../../dist');
app.use(express.static(dist));

console.log(path.join(__dirname, '../../dist'));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(dist, 'index.html'));
});

const port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

let io = socketIO.listen(server);

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} added.`);

    socket.on('chatMessage', (data) => {
        console.log(`Received new chat message`);
        io.emit('chatMessage', data);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} removed`);
    });

});

setInterval(() => {
    io.emit('chatMessage', {
        username: 'Server',
        body: `New message sent at ${new Date()}`,
        timestamp: Date.now()
    });
}, 10000);