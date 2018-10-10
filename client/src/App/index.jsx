import React, { Component } from 'react';
import MainPage from '../containers/MainPage';
import './style.scss';

export default class App extends Component {
  render() {
    return (
      <div className="wrap_main" >
        <MainPage />
      </div>
    );
  }
}
