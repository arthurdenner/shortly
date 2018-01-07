import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_USER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    password: '',
  };

  signup = async () => {
    const { history, signupUserMutation } = this.props;
    const { email, password } = this.state;

    try {
      const result = await signupUserMutation({
        variables: {
          email,
          password,
        },
      });

      // Store the ID and token in local storage.
      localStorage.setItem('SHORTLY_ID', result.data.signupUser.id);
      localStorage.setItem('SHORTLY_TOKEN', result.data.signupUser.token);

      history.push('/');
    } catch (err) {
      this.setState({ error: err.message });
      console.log(err.message);
    }
  };

  render() {
    const { email, error, password } = this.state;

    return (
      <div>
        {error && <div>{error}</div>}
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
        <button onClick={this.signup}>Signup</button>
      </div>
    );
  }
}

export default graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' })(
  Signup
);
