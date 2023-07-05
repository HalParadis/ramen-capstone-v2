import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

import {
  Products,
  ProductDetails
} from './index';

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getAllRamenFromAPI } from '../axios-services';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [allRamen, setAllRamen] = useState([]);

  const fetchRamen = async () => {
    const ramen = await getAllRamenFromAPI();
    setAllRamen(ramen);
  }

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();

    
    fetchRamen();
  }, []);

  return (
    <div className="app-container">
      <Route exact path='/'>
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
      </Route>

      <Route exact path='/products'>
        <Products
          allRamen={allRamen}
          fetchRamen={fetchRamen}
        />
      </Route>

      <Route path='/products/:productId'>
        <ProductDetails/>
      </Route>
    </div>
  );
};

export default App;
