import {initialState} from '../constants';

export function chatReducer(state = initialState, action) {
    switch(action.type){
        case 'NEW_MESSAGE':
            return Object.assign({}, state, {
                chatMessages: state.chatMessages.concat([action.message])
            });
        default:
            return state;
    }
}