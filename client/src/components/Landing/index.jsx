import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import Reginster from '../Auth/Register';
import Login from '../Auth/Login';

export default class Landing extends Component {
  render() {
    return (
      <div className="wrap_landing">
        <h1>Developer Connector</h1>
        <p>Creacte developer porfolio/profile</p>
        <div>
            <Link to="/register" component={Reginster}><button> Sign Up</button></Link>
            <Link to="/login" component={Login}><button> Login </button> </Link>
        </div>
      </div>
    )
  }
}
