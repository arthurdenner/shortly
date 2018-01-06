import React, { Component } from 'react';
import LinkItem from './LinkItem';
import Message from './Message';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_LINKS_QUERY = gql`
  query {
    allLinks {
      id
      url
      description
      hash
      stats {
        clicks
      }
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    Link(filter: { mutation_in: [UPDATED] }) {
      node {
        id
        url
        description
        hash
        stats {
          clicks
        }
      }
    }
  }
`;

class LinkList extends Component {
  componentDidMount() {
    const { allLinksQuery } = this.props;

    allLinksQuery.subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (
          prev.allLinks.find(l => l.id === subscriptionData.data.Link.node.id)
        ) {
          return prev;
        }
        
        const newLinks = [...prev.allLinks, subscriptionData.data.Link.node];
        const result = {
          ...prev,
          allLinks: newLinks,
        };

        return result;
      },
    });
  }

  render() {
    const { allLinksQuery } = this.props;

    if (allLinksQuery && allLinksQuery.loading) {
      return <Message text="Loading..." />;
    }

    if (allLinksQuery && allLinksQuery.error) {
      return <Message text="Error occurred" />;
    }

    if (allLinksQuery.allLinks.length === 0) {
      return <Message text="No links..." />;
    }

    return allLinksQuery.allLinks.map(link => (
      <LinkItem key={link.id} link={link} />
    ));
  }
}

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);
