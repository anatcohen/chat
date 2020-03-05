import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export function App(props) {
  // <Route exact path="/SignIn" render={(routeProps) => <SignIn {...routeProps} {...props} />} />

  return (
    <>
    </>
  );
}

function mapStateToProps(state) {
  return;
}

function mapDispatchToProps(dispatch) {
  return;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

