import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

const el = document.querySelector('#app');

ReactDOM.render(React.createElement(App, {}), el);
