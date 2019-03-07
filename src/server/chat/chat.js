const users = [
  {
    id: "blah",
    socketId: "blah",
    socket: {id: "whatever"},
    rooms: ["a", "b", "c"]
  }
]

export function start(io){
  io.on('connection', (socket) => {
    // let connectionID = socket.id;
    // let user = users.find((user) => user.socket.id === connectionID);
    // if(user){

    // }
    socket.emit('registerID', )
  });
}

export default {
  start,
}