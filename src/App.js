import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBebQeg9TQ5hWqUzdEKFR2sTr5De2fZ6sA",
  authDomain: "bloc-chat-react-ff236.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-ff236.firebaseio.com",
  projectId: "bloc-chat-react-ff236",
  storageBucket: "bloc-chat-react-ff236.appspot.com",
  messagingSenderId: "1098342004455"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: ''
    };
    this.selectActiveRoom = this.selectActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  selectActiveRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ user: user })
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList
            firebase={firebase}
            activeRoom = {this.state.activeRoom}
            selectActiveRoom = {this.selectActiveRoom}
          />
          <MessageList
            firebase={firebase}
            activeRoom = {this.state.activeRoom}
          />
          <User
            firebase={firebase}
            setUser={this.setUser}
            userName={this.state.user}
          />
          <h2>Current User: {this.state.user ? this.state.user.displayName : 'Guest'}</h2>
        </main>
      </div>
    );
  }
}

export default App;
