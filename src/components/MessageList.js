import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      allMessages: []
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState( {allMessages: this.state.allMessages.concat(message)});
      this.updateDisplayMessages(this.props.activeRoom.key);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateDisplayMessages(nextProps.activeRoom.key)
  }

  updateDisplayMessages(messageRoom){
    this.setState( {messages: this.state.allMessages.filter(message => message.roomId === messageRoom)})
  }

  render() {
    return (
      <div className = "messageList">
        <h1>Messages</h1>
        <div> {this.props.activeRoom.name} </div>
        <div>{this.state.messages.map((message, index) =>
          <div key={index}>{message.content}</div>
          )}
        </div>
      </div>
    )
  }
}

export default MessageList;
