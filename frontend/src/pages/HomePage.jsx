import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEventis } from '../store/actions/eventiActions'

import { EventisGrid } from '../cmps/EventisGrid'
import { Header } from '../cmps/Header';
import { Info } from '../cmps/Info';
import { PreviewScroll } from '../cmps/PreviewScroll';

export class _HomePage extends Component {


  componentDidMount() {
    this.props.loadEventis();
  }

  getTopEventis = () => {
    const eventis = [...this.props.eventis]
    return eventis.sort((a, b) => b.participants.length - a.participants.length).slice(0, 10);
  }


  render() {
    const topEventis = this.getTopEventis();
    return (
      <React.Fragment>

        <Header />
        <EventisGrid />
        <Info />
        <PreviewScroll topEventis={topEventis} />

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


