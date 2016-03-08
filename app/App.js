import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router'; //get me the Router property from 'react-router' --> var Router = require('react-router').Router;
import routes from './config/routes';


ReactDOM.render(
  <Router>{routes}</Router>,
    document.getElementById('app')
)
