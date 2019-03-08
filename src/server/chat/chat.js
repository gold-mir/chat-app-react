const users = [
  // {
  //   user: "blah",
  //   connections: [],
  //   rooms: ["a", "b", "c"]
  // }
]

export function setup(io) {
  io.on('connection', (socket) => {

    console.log(`Socket ${socket.id} added.`);

    socket.on('register', (userData, callback) => {
      console.log(`${userData} registered`);
      let user = users.find((item) => item.user === userData);
      if(user){
        user.connections.push(socket);
      } else {
        users.push({
          user: userData,
          connections: [socket],
          rooms: []
        });
      }
      callback(true);
      console.log(`Registered user ${userData}. ${users.length} active user${users.length === 1? '' : 's'}.`);
    });

    socket.on('chat message', (data) => {
      console.log(`Received new chat message`);
      io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} removed`);
      let user = users.find((item) => {
        let connection = item.connections.find((conn) => conn.id === socket.id);
        if(socket){
          return true;
        }
      });

      if(user) {
        user.connections.splice(user.connections.indexOf(socket), 1);
        if(user.connections.length === 0){
          users.splice(users.indexOf(user), 1);
          console.log(`${user.user} disconnected. ${users.length} active connection${users.length === 1? '' : 's'}.`);
        }
      }
    });


  });
}

export default {
  setup,
}