import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  render() {
    const { link } = this.props;

    return (
      <div>
        <div>
          {link.description} ({link.url} - {link.hash})
        </div>
      </div>
    );
  }
}

Link.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    hash: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Link;
