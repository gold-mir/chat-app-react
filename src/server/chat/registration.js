import { connections, getUserData } from './chat.module.js';
import EVENT from '../../shared/chatEvents.js';

export function handleRegistration(socket, userRef, callback) {
  console.log(`Got user registration for user ${userRef}`);
  //if socket is already registered to a user, no need to perform any operations. This should not happen.
  if (connections[socket.id]) {
    callback(true);
  } else {
    //check if user's ref is good
    if (validateUserRef(userRef)) {

      //get user's data when ref is good.
      let userData = getUserData();

      //subscribe this connection to each of the user's joined rooms.
      for (let room of userData.rooms) {
        socket.join(room);
      }

      //register this connection in connections
      connections[socket.id] = getUserIdFromRef(userRef);
      console.log(`User ref valid. ${Object.keys(connections).length} valid connections`);
      //send a response so client knows how to update page
      callback(true);
    } else {
      //send a response so client knows how to update page
      callback(false);
    }
  }
}

//returns true if a user's credentials are valid.
export function validateUserRef(userRef) {
  //we're not doing user authentication yet, so they are.
  return true;
}

function getUserIdFromRef(userRef) {
  return userRef;
}