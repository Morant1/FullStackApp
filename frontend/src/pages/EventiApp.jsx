import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadEvents } from '../store/actions/eventActions'
import { EventiList } from '../cmps/EventiList'
import { SideNav } from '../cmps/SideNav';


export class _EventiApp extends Component {

  state = {
    filterBy: {
      date: 'all',
      order: 'desc',
      sort: 'date',
    }
  }


  componentDidMount() {
    this.props.loadEvents(this.state.filterBy);
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.props.loadEvents(this.state.filterBy))

  }

  loadFilteredEvents = () => {
    const currTag = this.props.match.params.tag;
    if (currTag === 'All') return this.props.events;
    if (currTag === 'your_events') return this.loadGoingList(this.props.events);
    const filteredEvents = this.props.events.filter(event =>
      event.tags.includes(currTag));
    return filteredEvents


  }

  loadGoingList = (events) => {
    let goingList = [];
    for (let i = 0; i < events.length; i++) {
      for (let j = 0; j < events[i].participants.length; j++) {
        if (events[i].participants[j]._id === this.props.loggedInUser._id)
          goingList.push(events[i])
      }
    }
    return goingList
  }

  render() {
    const filteredEvents = this.loadFilteredEvents();
    if (!filteredEvents) return <img className='flex justift-center' src='http://38.media.tumblr.com/512aa2b4c47276e656036249dbaa5506/tumblr_n8ie0o3WG61twkrf5o1_400.gif'></img>

    return (
      <div className="list-events">
        <SideNav onSetFilter={this.onSetFilter}/>
        <EventiList events={filteredEvents} currTag={this.props.match.params.tag} />
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    events: state.eventReducer.events,
    loggedInUser: state.userReducer.loggedInUser
  };
};
const mapDispatchToProps = {
  loadEvents
};

export const EventiApp = connect(mapStateToProps, mapDispatchToProps)(_EventiApp)