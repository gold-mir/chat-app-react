import EVENT from '../../shared/chatEvents.js';
import { formatChatMessage } from '../../shared/chatmessage.js'
import socketIO from 'socket.io';

//import listeners
import { handleRegistration } from './registration.js';
import { handleMessage } from './messageHandler.js';

//stand-in for database interaction, to be implemented later
const users = {
  /*
  userId: {
    rooms: [a, b, c]
  }
   */
};
export function getUserData(userId){
  let user = users[userId];
  if(!user){
    user = { rooms: [] };
    users[userId] = user;
  }
  return user;
}


//contains all *valid* connections.
export const connections = {
  //[connectionId]: userId
}

export let IO;

export function setup(server){
  IO = socketIO.listen(server);
  setupChat();
}


function setupChat(){
  IO.on(EVENT.connect, (socket) => {
    console.log(`Socket added with id ${socket.id}`);
    //create requireRegistered function bound to this socket.
    const requireRegistered = getRequireRegistered(socket);

    //create event handlers
    const messageHandler = requireRegistered(withSocket(handleMessage, socket));
    const registrationHandler = withSocket(handleRegistration, socket);
    
    //bind handlers to events
    socket.on(EVENT.register, registrationHandler);
    socket.on(EVENT.message, messageHandler);


    socket.on(EVENT.disconnect, () => {
      console.log(`Socket ${socket.id} removed.`);

      delete connections[socket.id];
    });
  });
}

/**
 * returns a funciton that runs functions passed through *it* only if *socket* is properly registered.
 * 
 * @param {*} socket the socket to check registration against.
 */
function getRequireRegistered(socket){
  return (func) => {
    return (...args) => {
      if(connections[socket.id]){
        func(...args);
      }
    }
  }
}

function withSocket(func, socket){
  return (...args) => {
    func(socket, ...args);
  }
}


export default {
  setup,
}