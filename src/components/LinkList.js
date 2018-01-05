import React, { Component } from 'react';
import Link from './Link';
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
    }
  }
`;

class LinkList extends Component {
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
      <Link key={link.id} link={link} />
    ));
  }
}

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);
