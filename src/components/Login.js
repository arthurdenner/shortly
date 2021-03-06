import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const AUTHENTICATE_USER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  login = async () => {
    const { authenticateUserMutation, history } = this.props;
    const { email, password } = this.state;

    try {
      const result = await authenticateUserMutation({
        variables: {
          email,
          password,
        },
      });

      // Store the ID and token in local storage.
      localStorage.setItem('SHORTLY_ID', result.data.authenticateUser.id);
      localStorage.setItem('SHORTLY_TOKEN', result.data.authenticateUser.token);

      history.push('/');
    } catch (err) {
      this.setState({ error: err.message });
      console.log(err);
    }
  };

  render() {
    const { email, error, password } = this.state;

    return (
      <div>
        {error && <div>{error}</div>}
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
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default graphql(AUTHENTICATE_USER_MUTATION, {
  name: 'authenticateUserMutation',
})(Login);
