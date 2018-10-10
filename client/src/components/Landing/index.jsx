import React, { Component } from 'react';
import './style.scss';

export default class Landing extends Component {
  render() {
    return (
      <div className="wrap_landing">
        <h1>Developer Connector</h1>
        <p>Creacte developer porfolio/profile</p>
        <div>
            <button> Sign Up</button>
            <button> Login </button>
        </div>
      </div>
    )
  }
}
