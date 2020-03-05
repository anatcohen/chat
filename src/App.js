import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import ChatRoom from './ChatRoom';

export default function App(props) {

  return (
    <>
      <Switch>
        <Route path="/" exact component={LogIn} />
        <Route path="/ChatRoom" component={ChatRoom} />
      </Switch>
    </>
  );
}
