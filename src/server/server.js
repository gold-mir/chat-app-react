import express from 'express';
import path from 'path';
import socketIO from 'socket.io';
import Chat from './chat/chat.js';

const publicFiles = path.join(__dirname, '/public');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(publicFiles));

app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

console.log(`running in directory ${__dirname}`);
console.log(`Serving static files from ${publicFiles}`);

let toSend = path.join(publicFiles, 'index.html');
console.log(`Index.html is at ${toSend}`);

app.get('*', (req,res) =>{
  res.sendFile(toSend);
});

let server = app.listen(port, () => {
  console.log();
});

const io = socketIO.listen(server);
// Chat.start(io);

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} added.`);

  socket.on('chat message', (data) => {
      console.log(`Received new chat message`);
      io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} removed`);
  });

});

setInterval(() => {
  io.emit('chat message', {
      username: 'Server',
      body: `New message sent at ${new Date()}`,
      timestamp: Date.now()
  });
}, 10000);
