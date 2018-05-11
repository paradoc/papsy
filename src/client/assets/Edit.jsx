import React from 'react';
import PropTypes from 'prop-types';

const Edit = ({ onClick, className }) => (
  <div onClick={onClick} onKeyUp={() => {}} tabIndex="0" role="button" className={className}>
    <svg height="40" width="40" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 96 96" enableBackground="new 0 0 96 96" xmlSpace="preserve">
      <g id="XMLID_2_">
        <path id="XMLID_6_" fill="#333333" d="M20.5,64v11.5H32l33.8-33.8L54.3,30.2L20.5,64z M74.6,32.9c1.2-1.2,1.2-3.1,0-4.3l-7.1-7.1 c-1.2-1.2-3.1-1.2-4.3,0L57.6,27L69,38.4L74.6,32.9z" />
      </g>
    </svg>
  </div>
);
Edit.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};
Edit.defaultProps = {
  onClick: () => {},
  className: '',
};

export default Edit;
