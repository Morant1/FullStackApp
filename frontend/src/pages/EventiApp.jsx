import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadEventis } from '../store/actions/eventiActions'
import { EventiList } from '../cmps/EventiList'
import { EventiFilter } from '../cmps/EventiFilter'
import { GlobalSearch } from '../cmps/GlobalSearch';



export class _EventiApp extends Component {

  state = {
    filterBy: {
      date: 'all',
      sort: 'date'
    }
  }



  componentDidMount() {
      window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
      });
  
    this.props.loadEventis(this.state.filterBy);
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.props.loadEventis(this.state.filterBy))

  }

  loadFilteredEventis = () => {
    const {eventis} = this.props;
    const currTag = this.props.match.params.tag;
    let filteredEventis;
    if (currTag === 'all') return eventis;
    if (currTag === 'today') filteredEventis = eventis.filter(eventi => eventi.startsAt === Date.now())
    else filteredEventis = eventis.filter(eventi =>eventi.tags.includes(currTag));
    return filteredEventis


  }


  render() {
    const filteredEventis = this.loadFilteredEventis();
    const {filterBy} = this.state;
    return (
      <React.Fragment>
      <GlobalSearch/>
      <EventiFilter onSetFilter={this.onSetFilter} />
        { filteredEventis.length ? 
        <EventiList eventis={filteredEventis}/>
        :
        <div className="no-events">
          <iframe src="https://giphy.com/embed/55eL3Rlqxs1LCcd6ea" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
          {filterBy.date !== 'all' ? 
          <div>There's no events {filterBy.date !== 'today'? 'this':''} {filterBy.date}</div>
          : 'There\'s no matching events'}
          </div>}
        
        </React.Fragment>
    )
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

export const EventiApp = connect(mapStateToProps, mapDispatchToProps)(_EventiApp)