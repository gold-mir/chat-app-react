import EVENT from '../../shared/chatEvents.js';

export function handleMessage(socket, message){
  let room = message.room;
  socket.emit(EVENT.message, message);
}

export function getMessageHandler(socket){
  return (...args) => {
    handleMessage(socket, ...args);
  }
}