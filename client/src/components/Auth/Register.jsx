import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/registerActions';

class Reginster extends Component {
    state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      errors: {}
    };
  handleInputChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = (e) =>{
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    // const {errors} = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
        <p>Create your developer account</p>
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
           <input 
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
           <input 
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
           <input 
            type="password"
            placeholder="password2"
            name="password2"
            value={this.state.password2}
            onChange={this.handleInputChange}
          />
          <input
            type="submit"
          />
        </form>
      </div>
    )
  }
}

Reginster.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(Reginster));