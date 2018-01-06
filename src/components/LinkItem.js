import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LinkItem extends Component {
  render() {
    const { link } = this.props;

    return (
      <div>
        <div>
          {link.description}
          <Link to={`/${link.hash}`} target="_blank">
            ({link.url} - {link.hash})
          </Link>
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
