import React, { Component } from 'react'

export default class LoginForm extends Component {
  loginUser = (event) => {
    event.preventDefault()
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      console.log(error);
    })
  }

  render() {
    return (
      <form onSubmit={this.loginUser}>
        <input type="email" ref={input => {this.email = input}} />
        <input type="password" ref={input => {this.password = input}} />
        <button type="submit">Login</button>
      </form>
    )
  }
}
