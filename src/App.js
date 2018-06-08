import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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

const initRoomList = (props) => {
    return (
        <RoomList
            firebase={firebase}
            {...props}
        />
    );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Link to='/'>Room List</Link>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <Route exact path="/" render={initRoomList} />
        </main>
      </div>
    );
  }
}

export default App;
