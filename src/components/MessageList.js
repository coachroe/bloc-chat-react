import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      allMessages: [],
      newMessage: ''
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(this.state.allMessages)
      this.setState( {allMessages: this.state.allMessages.concat(message)}, () => {this.updateDisplayMessages(this.props.activeRoom.key)} );
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateDisplayMessages(nextProps.activeRoom.key)
  }

  updateDisplayMessages(messageRoom){
    this.setState( {messages: this.state.allMessages.filter(message => message.roomId === messageRoom)})
  }

  createMessage(e) {
    e.preventDefault();
    if (this.state.newMessage && this.props.user) {
      this.messagesRef.push ({
        username: this.props.user.displayName,
        content: this.state.newMessage,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom.key
      });
    this.setState({ newMessage: '' });
    }
  }

  handleNewMessage(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    return (
      <section className = "messageList">
        <h1>Messages</h1>
        <h2> {this.props.activeRoom.name} </h2>
        <div>{this.state.messages.map((message, index) =>
          <div key={index}>{message.username}: {message.content}</div>
          )}
        </div>
        <div className='newMessage'>
          {/*Form for creating a new message*/}
          <form onSubmit={(e) => this.createMessage(e)}>
            <input
              type="text"
              placeholder="Enter your message here..."
              value={this.state.newMessage}
              onChange={ (e) => this.handleNewMessage(e) }
            />
            <input type="submit"/>
          </form>
        </div>
      </section>
    )
  }
}

export default MessageList;
