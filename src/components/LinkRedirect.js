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
        id
        clicks
      }
    }
  }
`;

const CREATE_LINK_STATS_MUTATION = gql`
  mutation($linkId: ID!, $clicks: Int!) {
    createLinkStats(linkId: $linkId, clicks: $clicks) {
      id
    }
  }
`;

const FAKE_UPDATE_LINK = gql`
  mutation($id: ID!) {
    updateLink(id: $id, dummy: "dummy") {
      id
    }
  }
`;

const UPDATE_CLICK_COUNT_MUTATION = gql`
  mutation($id: ID!, $clicks: Int!) {
    updateLinkStats(id: $id, clicks: $clicks) {
      id
    }
  }
`;

const LinkRedirect = ({
  data: { loading, error, allLinks },
  hash,
  createLinkStats,
  fakeUpdateLink,
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

  if (!linkInfo.stats) {
    createLinkStats({
      variables: {
        linkId: linkInfo.id,
        clicks: 1,
      },
    });
  } else {
    let currentClicks = (linkInfo.stats && linkInfo.stats.clicks) || 0;

    // Increment the click count
    currentClicks++;

    // Update the click count.
    updateClickCount({
      variables: {
        id: linkInfo.stats.id,
        clicks: currentClicks,
      },
    });
  }

  // only to trigger subscription
  fakeUpdateLink({
    variables: {
      id: linkInfo.id,
    },
  });

  // Navigate to the full URL
  // window.location = linkInfo.url;

  return null;
};

LinkRedirect.propTypes = {
  hash: PropTypes.string.isRequired,
};

export default compose(
  graphql(UPDATE_CLICK_COUNT_MUTATION, { name: 'updateClickCount' }),
  graphql(CREATE_LINK_STATS_MUTATION, { name: 'createLinkStats' }),
  graphql(FAKE_UPDATE_LINK, { name: 'fakeUpdateLink' }),
  graphql(GET_FULL_LINK_QUERY, {
    options: ({ hash }) => ({ variables: { hash } }),
  })
)(LinkRedirect);
