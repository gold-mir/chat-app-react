import IO from 'socket.io-client';
import React from 'react';

const SERVER_LOCATION = "localhost:3000";

let instance;

class Chat {
  constructor(){
    this.socket = IO(SERVER_LOCATION);
  }

  connect(){
    this.socket.open();
    return this;
  }

  disconnect(){
    this.socket.disconnect();
    return this;
  }

  sendMessage(message){
    this.socket.emit('chat message', message);
    return this;
  }

   joinRoom(roomID){
     this.socket.emit('join room', roomID);
     return this;
   }

   leaveRoom(roomID){
     this.socket.emit('leave room', roomID);
     return this;
   }

   subscribeToMessages(callback){
     this.subscribeToEvent('chat message', callback);
   }

   subscribeToEvent(event, callback){
     this.socket.on(event, callback);
     return () => {
       this.socket.removeListener(event, callback);
     }
   }
}

export function getChat(){
  if(!instance){
    instance = new Chat();
  }
  return instance;
}

export function withChat(Component){
  return class extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
      return <Component chat={getChat()}/>
    }
  }
}