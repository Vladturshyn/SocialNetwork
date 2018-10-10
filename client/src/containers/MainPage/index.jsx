import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Landing from '../../components/Landing';

export default class index extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Landing />
        <Footer />
      </div>
    )
  }
}
