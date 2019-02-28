import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class ChatControl extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(){
        let { dispatch } = this.props;

        dispatch({
            type: 'NEW_MESSAGE',
            message: {username: this.props.username, body: `This is a message sent at ${new Date()}`}
        });
    }

    render(){
        return (
            <div>
                {this.props.username}
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