import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadEventis } from '../store/actions/eventiActions'
import { EventiList } from '../cmps/EventiList'



export class _EventiApp extends Component {




  componentDidMount() {
    this.props.loadEventis();
  }

  loadFilteredEventis = () => {
    const currTag = this.props.match.params.tag;
    const filteredEventis = this.props.eventis.filter(eventi =>eventi.tags.includes(currTag));
    return filteredEventis


  }


  render() {
    const filteredEventis = this.loadFilteredEventis();
    return (
      <div className="list-events">
        <EventiList eventis={filteredEventis}/>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    eventis: state.eventiReducer.eventis,
  };
};
const mapDispatchToProps = {
  loadEventis
};

export const EventiApp = connect(mapStateToProps, mapDispatchToProps)(_EventiApp)