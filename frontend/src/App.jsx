import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';


import {Navbar} from './cmps/Navbar';
import {Footer} from './cmps/Footer';
import {EventiApp} from './pages/EventiApp';
import {EventiEdit} from './pages/EventiEdit';
import {HomePage} from './pages/HomePage';
import {EventiDetails} from './pages/EventiDetails';
import {Login} from './pages/Login';



function App() {
  return (
    <div className="App main-container">
      <Router>
        <Navbar />
        <Switch>
        <Route component={EventiEdit} exact path="/edit/:_id?" />
         <Route component={EventiDetails} path='/:tag/:_id' />
          <Route component={Login} path='/login' />
          <Route component={EventiApp} path='/:tag' />
          <Route component={HomePage} path='/' />
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
