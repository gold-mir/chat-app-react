import {initialState} from '../constants';

export default function chatReducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case 'NEW_MESSAGE':
            newState = Object.assign({}, state, {
                chatMessages: state.chatMessages.concat([action.message])
            });
            return newState;
        default:
            return state;
    }
}