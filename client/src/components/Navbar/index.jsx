import React, { Component } from 'react';
import './style.scss';

export default class Navbar extends Component {
  render() {
    return (
      <div className="wrap_header">
        <div className="wrap_logo">
            <nav>
                <ul>
                    <li>
                        <a href="/">DevConnector</a>
                    </li>
                    <li>
                        <a href="/">Developers</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="wrap_login">
            <nav>
                <ul>
                    <li>
                        <a href="/">sign up</a>
                    </li>
                    <li>
                        <a href="/">login</a>
                    </li>
                </ul>
            </nav>
        </div>
      </div>
    )
  }
}
