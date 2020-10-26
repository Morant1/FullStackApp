import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadEventis } from '../store/actions/eventiActions'
import { EventiList } from '../cmps/EventiList'
import { EventiFilter } from '../cmps/EventiFilter'



export class _EventiApp extends Component {

  state = {
    filterBy: {
      date: 'all',
      sort: 'date'
    }
  }



  componentDidMount() {
    this.props.loadEventis(this.state.filterBy);
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.props.loadEventis(this.state.filterBy))

  }

  loadFilteredEventis = () => {
    const {eventis} = this.props;
    const currTag = this.props.match.params.tag;
    
    if (currTag === 'all') return eventis;
    const filteredEventis = eventis.filter(eventi =>eventi.tags.includes(currTag));
    return filteredEventis


  }


  render() {
    const filteredEventis = this.loadFilteredEventis();
    const {filterBy} = this.state;
    return (
      <React.Fragment>
      <EventiFilter onSetFilter={this.onSetFilter} />
        { filteredEventis.length ? 
        <EventiList eventis={filteredEventis}/>
        :
        <div className="no-events">
          <iframe src="https://giphy.com/embed/55eL3Rlqxs1LCcd6ea" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
          There's no events {filterBy.date !== 'today'? 'this':''} {filterBy.date}
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