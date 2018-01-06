import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Message from './Message';

const GET_FULL_LINK_QUERY = gql`
  query GetFullLink($hash: String!) {
    allLinks(filter: { hash: $hash }) {
      url
    }
  }
`;

const LinkRedirect = ({ hash, data: { loading, error, allLinks } }) => {
  if (loading) {
    return <Message text="Loading..." />;
  }

  if (error) {
    return <Message text="Error occurred" />;
  }

  if (!allLinks || allLinks.length !== 1) {
    return <Message text={`No redirect found for '${hash}'`} />;
  }

  // TODO: increase the click count here.
  window.location = allLinks[0].url;

  return null;
};

LinkRedirect.propTypes = {
  hash: PropTypes.string,
};

LinkRedirect.defaultProps = {
  hash: null,
};

export default graphql(GET_FULL_LINK_QUERY, {
  options: ({ hash }) => ({ variables: { hash } }),
})(LinkRedirect);
