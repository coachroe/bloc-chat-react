import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import styled from 'styled-components';


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
      <AppWrapper>
        <div className="App">
          <HeaderStyles>
              <div className="hero-title"> Bloc Chat </div>
              <div>
                <User
                  firebase={firebase}
                  user={this.state.user}
                  setUser={ (user) => this.setUser(user) }
                />
              </div>
              <div>{this.state.user ? this.state.user.displayName : 'Guest'}</div>
          </HeaderStyles>
          <ProductWrapper>
            <AsideStyles>
              <RoomList
                firebase={firebase}
                selectActiveRoom = { (room) => this.selectActiveRoom(room) }
              />
            </AsideStyles>
            <MainStyles>
              <MessageList
                firebase={firebase}
                activeRoom = {this.state.activeRoom}
                user={this.state.user}
              />
            </MainStyles>
          </ProductWrapper>
        </div>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.section`
  display: grid;
  grid-grap: 20px;
  grid-template-rows: 100px 1fr;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const HeaderStyles = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  outline: 2px solid #fafafa;
  background-color: #333333;

  div {
    color: #FFFFFF
    font-weight: bold;
  }

`;

const ProductWrapper = styled.section`
  display: flex;
`;

const AsideStyles = styled.aside`
  display: inline-flex;
  justify-content: flex-start;
  padding: 5px;
  background-color: #DEDEDE;
  width: 25%;
`;

const MainStyles = styled.main`
  display: inline-flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 5px;
  width: 75%;
`;

export default App;
