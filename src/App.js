import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Redux/Actions';
import './App.css';
import LogIn from './LogIn';
import ChatRoom from './ChatRoom';

function App(props) {
  return (
    <>
      <Switch>
        <Route exact path="/" render={(routeProps) => <LogIn {...routeProps} {...props} />} />
        <Route exact path="/ChatRoom" render={(routeProps) => <ChatRoom {...routeProps} {...props} />} />
      </Switch>
    </>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users,
    messages: state.messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSelfToDataBase: name => { dispatch(actions.addSelfToDataBase(name)) },
    getUsers: () => { dispatch(actions.getUsers()) },
    deleteSelf: id => { dispatch(actions.deleteSelf(id)) },
    sendMessage: (content, timeStamp, user) => { dispatch(actions.addMessageToDataBase(content, timeStamp, user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
