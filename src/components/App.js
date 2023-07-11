import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

import {
  Products,
  ProductDetails,
  UserForm,
  Account,
  Cart
} from './index';

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { 
  getAPIHealth, 
  getAllRamenFromAPI,
  getRamenByIdFromAPI 
} from '../axios-services';

import '../style/App.css';


const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [allRamen, setAllRamen] = useState([]);
  const [selectedRamen, setSelectedRamen] = useState(undefined);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  const fetchRamen = async () => {
    const ramen = await getAllRamenFromAPI();
    setAllRamen(ramen);
  }

  const fetchRamenById = async (id) => {
    const selectedRamen = await getRamenByIdFromAPI(id);
    setSelectedRamen(selectedRamen)
    return selectedRamen;
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
    <div className='app-container'>

      <header className='app-header'>
        <h1>We Love Ramen!</h1>

        <div className='header-links'>
          <Link to='/products'>Ramen</Link> |
          {
            token
              ? <>
                <Link to='/account'>Account</Link> |
                <Link to='/cart'>Shopping Cart</Link>
                </>
              : <Link to='/users/login'>Login</Link>
          }
        </div>
      </header>

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
        <ProductDetails
          selectedRamen={selectedRamen}
          fetchRamenById={fetchRamenById}
        />
      </Route>

      <Route path='/users/:actionType'>
        <UserForm
          setUser={setUser}
          setToken={setToken}
          token={token}
        />
      </Route>

      <Route path='/account'>
        <Account
          setToken={setToken}
          token={token}
          setUser={setUser}
          user={user}
        />
      </Route>

      <Route path='/cart'>
        <Cart
          token={token}
          user={user}
          fetchRamenById={fetchRamenById}
        />
      </Route>
    </div>
  );
};

export default App;
