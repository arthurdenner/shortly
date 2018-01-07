import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  login = async () => {
    // TODO: Login code here.
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h2>Login to Shortly</h2>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Email address"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <br />
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <br />
        <button onClick={() => this.login()}>Login</button>
      </div>
    );
  }
}

export default Login;
