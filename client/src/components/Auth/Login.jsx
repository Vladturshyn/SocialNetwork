import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    email:'',
    password:'',
    errors:{}
  };
  handleInputChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = (e) =>{
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
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
