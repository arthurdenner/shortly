import React from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Message from './Message';

const GET_FULL_LINK_QUERY = gql`
  query($hash: String!) {
    allLinks(filter: { hash: $hash }) {
      id
      url
      stats {
        clicks
      }
    }
  }
`;

const UPDATE_CLICK_COUNT_MUTATION = gql`
  mutation($id: ID!, $clicks: Int!) {
    updateLink(id: $id, dummy: "dummy", stats: { clicks: $clicks }) {
      id
    }
  }
`;

const LinkRedirect = ({
  data: { loading, error, allLinks },
  hash,
  updateClickCount,
}) => {
  if (loading) {
    return <Message text="Loading..." />;
  }

  if (error) {
    return <Message text="Error occurred" />;
  }

  if (!allLinks || allLinks.length !== 1) {
    return <Message text={`No redirect found for '${hash}'`} />;
  }

  const linkInfo = allLinks[0];
  let currentClicks = (linkInfo.stats && linkInfo.stats.clicks) || 0;

  // Increment the click count
  currentClicks++;

  // Update the click count.
  updateClickCount({
    variables: {
      id: linkInfo.id,
      clicks: currentClicks,
    },
  });

  // Navigate to the full URL
  window.location = linkInfo.url;

  return null;
};

LinkRedirect.propTypes = {
  hash: PropTypes.string.isRequired,
};

export default compose(
  graphql(UPDATE_CLICK_COUNT_MUTATION, { name: 'updateClickCount' }),
  graphql(GET_FULL_LINK_QUERY, {
    options: ({ hash }) => ({ variables: { hash } }),
  })
)(LinkRedirect);
