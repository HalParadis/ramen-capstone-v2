import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { App } from './components';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

// const rootEl = document.getElementById('app');
// const root = ReactDOMClient.createRoot(rootEl);
// root.render(<BrowserRouter><App/></BrowserRouter>);

ReactDOM.render(<App />, document.getElementById('root'));
