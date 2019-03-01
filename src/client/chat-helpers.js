import openSocket from 'socket.io-client';

const sockets = {};
let masterSocket;


export function getSocket(){
  if(masterSocket) {
    return masterSocket;
  } else {
    masterSocket = openSocket('http://localhost:3000');
    return masterSocket;
  }
}

function destroySocket(socket){
  socket.close();
}

export function getChatInstance() {

  let socket = getSocket();

  let control = {
    socket: socket,
    sendMessage: (message) => {
      socket.emit('chatMessage', message);
    },
    subscribe: (callback) => {
      socket.on('chatMessage', (data) => {
        callback(data);
      })
    },
    destroy: () => {
      destroySocket(socket)
    }
  }

  return control;
}



export function getChat(){
  return {

  }
}