import React, { Component } from 'react';
import './style.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="wrap_footer">
        Copyright &copy; {new Date().getFullYear()} DevConnector
      </div>
    )
  }
}
