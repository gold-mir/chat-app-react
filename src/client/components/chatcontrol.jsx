import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getChat } from '../chat/chat.module';
import PropTypes from 'prop-types';

import { formatChatMessage } from '../../shared/chatmessage';

class ChatControl extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(){
        this.chat.sendMessage(formatChatMessage(this.props.username, `New message sent at ${new Date}`));
    }

    componentDidMount(){
        this.chat = getChat();
    }

    componentWillUnmount(){
    }

    render(){
        return (
            <div>
                Logged in as {this.props.username}
                <hr/>
                {this.props.messages.map((item, index) => {
                    return (
                    <div key={index}>
                        {item.username}: {item.body}
                    </div>);
                })}
                <button onClick={this.sendMessage}>do not press</button>
            </div>);

    }
}

function mapStateToProps(state){
    return {
        messages: state.chatMessages,
        username: state.username
    }
}

export default connect(mapStateToProps)(ChatControl);