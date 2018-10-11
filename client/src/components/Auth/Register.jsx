import React, { Component } from 'react'
import axios from 'axios';

export default class Reginster extends Component {
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

  onSubmit = (e) =>{
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    axios
      .post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  };

  render() {
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
