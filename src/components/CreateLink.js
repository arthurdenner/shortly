import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_LINK_MUTATION = gql`
  mutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  };

  createShortLink = async () => {
    const { createLinkMutation } = this.props;
    const { url, description } = this.state;

    await createLinkMutation({
      variables: {
        url,
        description,
      },
    });
  };

  render() {
    return (
      <div>
        <input
          id="url"
          type="text"
          value={this.state.url}
          placeholder="Link URL"
          onChange={e => this.setState({ url: e.target.value })}
        />
        <input
          id="description"
          type="text"
          value={this.state.description}
          placeholder="Link description"
          onChange={e => this.setState({ description: e.target.value })}
        />
        <button onClick={() => this.createShortLink()}>Create</button>
      </div>
    );
  }
}

export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(
  CreateLink
);
