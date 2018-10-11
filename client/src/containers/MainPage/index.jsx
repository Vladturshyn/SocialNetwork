import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../../store';

import { Provider } from 'react-redux';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Landing from '../../components/Landing';
import Login from '../../components/Auth/Login';
import Reginster from '../../components/Auth/Register';

export default class MainPage extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/login" component={ Login } />
              <Route exact path="/register" component={ Reginster } />
            </div>
            <Footer />
          </div>
      </Router>
     </Provider>
    )
  }
}
