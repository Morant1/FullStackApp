import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadEventis } from '../store/actions/eventiActions'
import {EventsGrid} from '../cmps/EventsGrid'
import { Header } from '../cmps/Header';
import { Info } from '../cmps/Info';
import { HashtagScroll } from '../cmps/HashtagScroll';

export class _HomePage extends Component {


  componentDidMount() {
    this.props.loadEventis();
  }

  render() {
    const eventis = this.props.eventis;
    if (!eventis) return <div>Loading...</div>
    console.log(eventis)

    return (
      <React.Fragment>

        <Header/>
        <EventsGrid/>
        <HashtagScroll/>
        <Info/>

      </React.Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
    eventis: state.eventiReducer.eventis
  };
};
const mapDispatchToProps = {
  loadEventis
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
