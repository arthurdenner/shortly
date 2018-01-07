import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CreateLink from './components/CreateLink';
import LinkList from './components/LinkList';

const LOGGED_IN_USER_QUERY = gql`
  query CurrentUser {
    loggedInUser {
      id
    }
  }
`;

class Home extends Component {
  logout = () => {
    const { history } = this.props;

    localStorage.removeItem('SHORTLY_ID');
    localStorage.removeItem('SHORTLY_TOKEN');

    window.location.reload();
  };

  render() {
    const { currentUser } = this.props;

    if (currentUser && currentUser.loading) {
      return <div>Loading ... </div>;
    }

    const userId = currentUser.loggedInUser && currentUser.loggedInUser.id;

    if (userId) {
      return (
        <div>
          Hi user <b>{userId}</b> (<button onClick={this.logout}>logout</button>)
          <br />
          <div>
            <h2>Create a short link</h2>
            <CreateLink />
          </div>
          <div>
            <h2>All links</h2>
            <LinkList />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Please <a href="/login">login</a> or <a href="/signup">sign up</a>!
        </div>
      );
    }
  }
}

export default graphql(LOGGED_IN_USER_QUERY, { name: 'currentUser' })(Home);
