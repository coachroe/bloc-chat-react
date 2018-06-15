import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


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
      activeRoom: ''
    };
    this.selectActiveRoom = this.selectActiveRoom.bind(this);
  }

  selectActiveRoom(room) {
    this.setState({ activeRoom: room})
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
        </main>
      </div>
    );
  }
}

export default App;
