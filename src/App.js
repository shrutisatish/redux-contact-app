import React, { Component } from 'react';
import Main from './components/main'
import './styles/App.scss';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export default class App extends Component {

    render() {
      return(
        <div className='App'>
          <Main/>
        </div>
      )
    }
};
