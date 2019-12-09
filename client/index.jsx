import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/extensions
import App from './app.jsx';

const id = (new URL(window.location)).searchParams.get('id');

ReactDOM.render(<App id={id} />, document.getElementById('app'));
