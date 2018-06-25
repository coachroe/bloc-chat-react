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
      user: null
    };
    this.roomsRef = firebase.database().ref('rooms');
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
            selectActiveRoom = { (room) => this.selectActiveRoom(room) }
          />
          <MessageList
            firebase={firebase}
            activeRoom = {this.state.activeRoom}
            user={this.state.user}
          />
          <User
            firebase={firebase}
            user={this.state.user}
            setUser={ (user) => this.setUser(user) }
          />
          <h2>Current User: {this.state.user ? this.state.user.displayName : 'Guest'}</h2>
        </main>
      </div>
    );
  }
}

export default App;
