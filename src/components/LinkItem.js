import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LinkItem extends Component {
  render() {
    const { link } = this.props;
    const clickCount = (link.stats && link.stats.clicks) || 0;

    return (
      <div>
        <div>
          {link.description}{' '}
          <a href={link.hash} target="_blank">
            ({link.url} - {link.hash})
          </a>
          {' -'} {clickCount} clicks
        </div>
      </div>
    );
  }
}

LinkItem.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    hash: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default LinkItem;
