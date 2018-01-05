import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import createHash from '../utils/create-hash';

const CREATE_LINK_MUTATION = gql`
  mutation($description: String!, $hash: String!, $url: String!) {
    createLink(description: $description, hash: $hash, url: $url) {
      id
    }
  }
`;

const GET_LINK_COUNT_QUERY = gql`
  query GetLinkCountQuery {
    links: _allLinksMeta {
      count
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  };

  createShortLink = async () => {
    const { client, createLinkMutation } = this.props;
    const { url, description } = this.state;

    const linkCountQuery = await client.query({
      query: GET_LINK_COUNT_QUERY,
      fetchPolicy: 'network-only',
    });

    const linkCount = linkCountQuery.data.links.count;
    const hash = createHash(linkCount);

    await createLinkMutation({
      variables: {
        url,
        description,
        hash,
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
  withApollo(CreateLink)
);
