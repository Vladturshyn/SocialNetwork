import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';

class Login extends Component {
  state = {
    email:'',
    password:'',
    errors:{}
  };
  
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashbord');
    }
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  };
  handleInputChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = (e) =>{
    e.preventDefault();
    const userData= {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="email" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleInputChange}/>
          <input 
            type="password" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleInputChange}/>
          <input 
            type="submit"/>
        </form>
      </div>
    )
  }
}

Login.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{loginUser})(Login);