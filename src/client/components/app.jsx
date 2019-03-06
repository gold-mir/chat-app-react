import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//import components
import ChatControl from './chatcontrol';
import { getChat } from '../chat/chat.module';

class App extends React.Component {

  constructor(props){
    super(props);
    this.chat = getChat()
    this.chat.subscribeToMessages((message) => {
      console.log('message');
      this.props.dispatch({
        type: "NEW_MESSAGE",
        message: message
      });
    });
  }

  render(){
    return (
      <div>
        <h1>Chat App</h1>
        <ChatControl/>
      </div>
    )
  }
}

export default connect()(App);