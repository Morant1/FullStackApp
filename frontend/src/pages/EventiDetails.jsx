import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


import { Avatar, Button } from '@material-ui/core';
import { StarRate } from '../cmps/StarRate';
import { Chat } from '../cmps/Chat'
import { Modal } from '../cmps/Modal'
import { eventService } from '../services/eventService';
import { updateEvent } from '../store/actions/eventActions'
import { updateUser } from '../store/actions/userActions'
import { BusService } from '../services/event-bus-service'
import { removeEventi } from '../store/actions/eventActions'


class _EventiDetails extends Component {
  state = {
    eventi: null,
    isOpen: false,
    isModal: false
  }
  componentDidMount() {
    this.loadEventi()
    console.log("loggedInUser:",this.props.loggedInUser)
  }

  loadEventi = () => {
    const { _id } = this.props.match.params
    eventService.getById(_id)
      .then(eventi => {
        this.setState({ eventi })
        BusService.emit('notify', { msg: `You watched ${eventi.title} details` })
      })

  }

  onBack = () => {
    this.props.history.goBack();
  }
  openChat = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }


  isGoing = () => {
      const participant = this.state.eventi.participants.find(participant => participant._id === this.props.loggedInUser._id);
      return participant;
  }

  addParticipant = () => {
      const participant = this.isGoing();
      let eventi = {...this.state.eventi};

      if (!participant) {
        eventi.participants = [this.props.loggedInUser, ...eventi.participants]
        BusService.emit('notify', { msg: `You are going to ${eventi.title} event` })
      } else {
        eventi.participants = eventi.participants.filter(participant => {
        return participant._id !==  this.props.loggedInUser._id})

        BusService.emit('notify', { msg: `You are not going to ${eventi.title} event anymore` })
      }
      this.props.updateEvent(eventi)
      this.setState({ eventi })

    
  }

  onModal = () => {
    this.setState({ isModal: !this.state.isModal })
  }

  onFood = () => {
    this.setState({ isFood: !this.state.isFood })
  }
  getGoingStyle = () => {
    if (this.state.isGoing) {
      return { backgroundColor: '#272343', color: '#88E4E4' }
    }
  }

  removeEvent = (eventId) => {
    this.props.removeEvent(eventId);
    this.props.history.push(`/${this.state.eventi.tags[0]}`);
  };

  render() {
    const { eventi, isGoing } = this.state
    if (!eventi) return <div>Loading...</div>
    return (

      <section className="eventi-details flex margin container">
        <div className="close" onClick={this.onBack}>← Go Back </div>
        <div className="details-photo-grid details-wrapper flex justify-center">
          <div className="photo-item-1">
            <img src={`https://res.cloudinary.com/dk67dcp9c/image/upload/v1601374151/${eventi.tags[1]}/${eventi.tags[2]}-5.jpg`} />
          </div>
          <div className="photo-item-2">
            <div className="photo-inline-grid">
              <div className="inner-photo-1">
                <img src={`https://res.cloudinary.com/dk67dcp9c/image/upload/v1601374151/${eventi.tags[1]}/${eventi.tags[2]}-1.jpg`} />
              </div>

              <div className="inner-photo-2">
                <img src={`https://res.cloudinary.com/dk67dcp9c/image/upload/v1601374151/${eventi.tags[1]}/${eventi.tags[2]}-2.jpg`} />
              </div>
              <div className="inner-photo-3">
                <img src={`https://res.cloudinary.com/dk67dcp9c/image/upload/v1601374151/${eventi.tags[1]}/${eventi.tags[2]}-3.jpg`} />
              </div>
            </div>
          </div>
          <div className="photo-item-3">
            <img src={`https://res.cloudinary.com/dk67dcp9c/image/upload/v1601374151/${eventi.tags[1]}/${eventi.tags[2]}-4.jpg`} />
          </div>
        </div>
        <ul className="details-wrapper flex">
          <ul className="details-container flex">
            {/* <i className="fa fa-tag" aria-hidden="true"></i><div className="">{eventi.tags[0]}</div> */}
            <li className="bottom"><h2>{eventi.title}</h2></li>
            <li className="second-line flex bottom">{eventi.subtitle}</li>
            <li className="second-line flex align-center bottom">
              <div className="stars flex align-center">
                <StarRate rank={eventi.rank} />
              </div> • <div className="location fas fa-map-marker-alt "></div>  <span className="eventi-location">{eventi.location.city},{eventi.location.country}</span>
            </li>
            <ul className="host-container">
              <div className="host-name bottom">
                <span className="text"> This Event is hosted by:</span>
                <div className="avatar fas fa-user-circle">
                  <span className="text"> {eventi.createdBy.username} </span>
                </div>
              </div>
              <li><div className="globe far fa-comment-alt" aria-hidden="true"></div><span> Hosted in English and Hebrew</span></li>
              <li><div className=" tablet fas fa-tablet-alt"></div><span> Join from your computer, phone, or tablet</span></li>
            </ul>
            <div className="duration-title">Some Technical Info</div>
            <ul className="duration-container flex">
              <div className="inner-duration flex">
                <li><div className="far fa-clock"></div> {new Date(eventi.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                <li>{new Date(eventi.startsAt).toDateString()}</li>
              </div>
              <div className="inner-duration right flex">
                <li><div className="duration fas fa-hourglass-half"></div> {eventi.duration} hours</li>
                <li>{this.state.isModal && <Modal onModal={this.onModal} _id={eventi._id} />}
                  <a className="zoom flex justify-center" href='https://us02web.zoom.us'>Zoom Link </a></li>
                {/* <span className="zoom">(will be availible soon)</span> */}
              </div>
            </ul>
            <li className="description bottom">What it's all about?</li>
            <li className="bottom"><p>{eventi.description}</p></li>
            <li><div className="chat flex">
              {!this.state.isOpen && <div className="chat-btn" onClick={this.openChat}><i className="far fa-comment-dots text"></i> Chat with your Host</div>}
            </div>
              {this.state.isOpen && <Chat eventi={eventi} user={this.props.loggedInUser} openChat={this.openChat} />}
            </li>
          </ul>

          <li className="participant-container flex align-center">
            <div className="details-btn flex justify-center">
              <button className="join" style={this.getGoingStyle()}
                onClick={this.addParticipant}>
                {this.isGoing() ? 'attending' : 'choose'}
              </button>
              <button onClick={this.onModal}>Edit</button>
              <button onClick={() => this.removeEventi(eventi._id)}>Delete</button>
            </div>
            <div className="participant-title">Participants</div>
            <ul className="participant-list flex">
              {
                eventi.participants.map(participant => {
                  return <li key={participant._id} className="participant-item flex align-center">
                    <Avatar>{participant.username[0].toUpperCase()}</Avatar>
                    <span className="participant-name">{participant.username}</span>
                  </li>
                })
              }
            </ul>
          </li>

        </ul>

      </section>

    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userReducer.loggedInUser
  };
};

const mapDispatchToProps = {
  updateEvent,
  updateUser,
  removeEventi
}

export const EventiDetails = connect(mapStateToProps, mapDispatchToProps)(_EventiDetails)






