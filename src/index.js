import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOMClient from 'react-dom/client';
import { App } from './components';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

const rootEl = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootEl);
root.render(<BrowserRouter><App/></BrowserRouter>);
