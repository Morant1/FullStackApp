import React, { Component } from 'react';

import {EventisGrid} from '../cmps/EventisGrid'
import { Header } from '../cmps/Header';
import { Info } from '../cmps/Info';
import { HashtagScroll } from '../cmps/HashtagScroll';

export class HomePage extends Component {


  render() {

    return (
      <React.Fragment>

        <Header/>
        <EventisGrid/>
        <HashtagScroll/>
        <Info/>

      </React.Fragment>
    );
  }
}


