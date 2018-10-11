import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Navbar extends Component {
  render() {
    return (
      <div className="wrap_header">
        <div className="wrap_logo">
            <nav>
                <ul>
                    <li>
                        <Link to="/">DevConnector</Link>
                    </li>
                    <li>
                        <Link to="/profiles">Developers</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="wrap_login">
            <nav>
                <ul>
                    <li>
                        <Link to="/register">sign up</Link>
                    </li>
                    <li>
                        <Link to="/login">login</Link>
                    </li>
                </ul>
            </nav>
        </div>
      </div>
    )
  }
}
