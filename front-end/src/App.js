import React, { useEffect } from 'react';

import './App.css';
import Home from './Components/Home/Home';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from './axios';

// import { useSelector, useDispatch } from 'react-redux';

const App = () => {

  useEffect(() => {

    if ( Cookies.get( 'usrID' ) !== undefined )
    {

      const ID = new FormData();
      ID.append( 'ID', Cookies.get( 'usrID' ) );
      axios.post( '/getuserdata', ID ).then( response => {



      } );

    }

  }, []);

  return (

    <>
      <Switch>

        <Route exact path="/" component={ Home } />

      </Switch>
    </>

  );

}

export default App;