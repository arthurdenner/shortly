import React, { Component } from 'react';

class Signup extends Component {
  state = {
    email: '',
    password: '',
  };

  signup = async () => {
    // TODO: Signup code here.
  };

  render() {
    const { email, password } = this.props;

    return (
      <div>
        <h2>Join Shortly</h2>
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
        <button onClick={() => this.signup()}>Signup</button>
      </div>
    );
  }
}

export default Signup;
