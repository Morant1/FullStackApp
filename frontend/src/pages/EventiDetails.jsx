import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


import { Avatar } from '@material-ui/core';
import { Chat } from '../cmps/Chat'
import { eventiService } from '../services/eventiService';
import { BusService } from '../services/event-bus-service'

class _EventiDetails extends Component {
  state = {
    eventi: null
  }
  componentDidMount() {
    this.loadEventi()
  }

  loadEventi = () => {
    const { _id } = this.props.match.params
    eventiService.getById(_id)
      .then(eventi => {
        this.setState({ eventi })
        BusService.emit('notify', { msg: `You watched ${eventi.title} details` })
      })

  }

  getDate = () => {
    const {eventi} = this.state;
    const time = new Date(eventi.startsAt).toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })
    const date = new Date(eventi.startsAt).toLocaleDateString('he-IL')
    return `${date} ,${time}`
  }

  calcParticipants = () => {
    const {eventi} = this.state;
    if (!eventi.capacity) return '';
    return `(${eventi.capacity - eventi.participants.length} available)`;
  }


  render() {
    const { eventi } = this.state
    if (!eventi) return <div>Loading...</div>
    return (

      <section className="eventi-details">
        <div className="details-wrapper">

          <div className="intro">
            <img src={require(`../assets/img/${eventi.tags[0]}/${eventi.imgUrl}`)} alt="event-creator" />

            <div className="intro-details">
              <div className="creator">
                <Avatar className="avatar">{eventi.createdBy.username[0].toUpperCase()}</Avatar>
                <h3>{eventi.createdBy.username.toUpperCase()}</h3>
              </div>
              <h1>{eventi.title}</h1>
              <p>{eventi.description}</p>

              <ul className="tags">
                {eventi.tags.map((tag, idx) => <li key={`${tag}-${idx}`}>{tag}</li>)}
              </ul>


            </div>
            <div className="actions">
              <div className="join">JOIN</div>
              <i className="icon far fa-heart beat"></i>
            </div>

          </div>
          <div className="details-info"></div>
          <ul>
    <li><i class="fas fa-warehouse"></i>Capacity:  {eventi.capacity? eventi.capacity: 'unlimited'}</li>
            <li><i class="far fa-calendar-alt"></i>Date and Time:  {this.getDate()}</li>
            <li><i class="far fa-hourglass"></i>Duration:  {eventi.duration} hrs</li>
            <li><i class="fas fa-map-marker-alt"></i>Location:  Online</li>
    <li> <i class="fas fa-user-friends"></i>Participants:  {eventi.participants.length} {this.calcParticipants()}</li>
          </ul>
        </div>

      </section>

    )
  }
}

const mapStateToProps = state => {
  return {
    // loggedInUser: state.userReducer.loggedInUser
  };
};

const mapDispatchToProps = {
  // updateEvent,
  // updateUser,
  // removeEventi
}

export const EventiDetails = connect(null, mapDispatchToProps)(_EventiDetails)






