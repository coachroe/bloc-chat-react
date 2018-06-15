import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState( {messages: this.state.messages.concat(message)});
    });
  }


  render() {
    return (
      <div className = "messageList">
        <h1>Messages</h1>
        <div> {this.props.activeRoom.name} </div>
        <div>{this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
          <li key={index}>{message.content}</li>
          )}
        </div>
      </div>
    )
  }
}

export default MessageList;
