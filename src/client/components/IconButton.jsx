import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Extraction from '../assets/Extraction';
import Filling from '../assets/Filling';
import RootCanal from '../assets/RootCanal';
import Dentures from '../assets/Dentures';
import CheckUp from '../assets/CheckUp';
import OP from '../assets/OP';

import context from '../context';

const update = (treatmentId) => {
  context.treatment_id = treatmentId;
};

class IconButton extends React.Component {
  render() {
    let icon;

    const wrapper = props => WrappedComponent => (
      <Link to="/schedule">
        <div
          className="icon-button"
          onKeyPress={() => {}}
          onClick={() => update(this.props.data.id)}
          role="button"
          tabIndex={this.props.data.id}
        >
          <WrappedComponent {...props} />
          <span>{this.props.data.name}</span>
        </div>
      </Link>
    );

    switch (this.props.data.id) {
      case 1:
        icon = OP;
        break;
      case 2:
        icon = Extraction;
        break;
      case 3:
        icon = Filling;
        break;
      case 4:
        icon = RootCanal;
        break;
      case 5:
        icon = Dentures;
        break;
      case 6:
        icon = CheckUp;
        break;
      default:
        icon = () => <div />;
        break;
    }

    return wrapper()(icon);
  }
}
IconButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default IconButton;
