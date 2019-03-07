import IO from 'socket.io-client';
import React from 'react';

const SERVER_LOCATION = "localhost:3000";

let instance;

class Chat {
  constructor() {
    this.stateListeners = [];
    this.userData = null;
    this.registered = false;
    this.socket = IO(SERVER_LOCATION);

    this.socket.on('connect', () => {
      console.log(`Connected as ${this.socket.id}`);
    });

    this.socket.on('disconnect', () => {
      this.setRegistered(false);
    });

    this.socket.on('reconnect', () => {
      if(this.userData != null){
        this.register(this.userData);
      }
    });
  }

  connect() {
    this.socket.open();
    return this;
  }

  disconnect() {
    this.socket.disconnect();
    return this;
  }

  sendMessage(message) {
    this.socket.emit('chat message', message);
    return this;
  }

  joinRoom(roomID) {
    this.socket.emit('join room', roomID);
    return this;
  }

  leaveRoom(roomID) {
    this.socket.emit('leave room', roomID);
    return this;
  }

  subscribeToMessages(callback) {
    this.subscribeToEvent('chat message', callback);
  }

  subscribeToEvent(event, callback) {
    this.socket.on(event, callback);
    return () => {
      this.socket.removeListener(event, callback);
    }
  }

  subscribeToRegistered(callback) {
    this.stateListeners.push(callback);
    return () => {
      this.stateListeners.splice(this.stateListeners.indexOf(callback), 1);
    }
  }

  setRegistered(value) {
    this.registered = value;
    for(listener of this.stateListeners){
      listener(this.registered);
    }
  }

  register(userData) {
    this.socket.emit('register', userData, (response) => {
      if(response){
        this.userData = userData;
        this.setRegistered(true);
      }
    });
  }
}

export function getChat() {
  if (!instance) {
    instance = new Chat();
  }
  return instance;
}

export function withChat(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <Component chat={getChat()} />
    }
  }
}