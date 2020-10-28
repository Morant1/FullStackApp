import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


import { Comments } from '../cmps/Comments'
// import { loadEventis } from '../store/actions/eventiActions'
import { Avatar, ThemeProvider } from '@material-ui/core';
import { Chat } from '../cmps/Chat'
import { eventiService } from '../services/eventiService';
import { BusService } from '../services/event-bus-service'

class _EventiDetails extends Component {
  state = {
    eventi: null,
    isJoined: false,
    isEdit: false,
    checkedB: false,
    isChat: false,
    nextId: null,
    prevId: null
  }

  componentDidMount() {
    this.loadEventi()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params._id !== this.props.match.params._id) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      this.loadEventi()
    }
  }
  loadEventi = async () => {
    const { _id } = this.props.match.params;
    const eventi = await eventiService.getById(_id);
    this.setState({ eventi }, () => { this.getPrevNextId() });

    BusService.emit('notify', { msg: `You watched ${eventi.title} details` })

  }


  getDate = () => {
    const { eventi } = this.state;
    const time = new Date(eventi.startsAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const date = new Date(eventi.startsAt).toLocaleDateString('he-IL')
    return `${date} ,${time}`
  }

  calcParticipants = () => {
    const { eventi } = this.state;
    if (!eventi.capacity) return '';
    return `(${eventi.capacity - eventi.participants.length} available)`;
  }

  getPrevNextId = async () => {
    const { prevId, nextId } = await eventiService.getPrevNext(this.state.eventi);
    this.setState({ prevId, nextId })
  }


  handleChange = (name) => {
    this.setState({ [name]: !this.state[name] });
  }

  render() {
    const { eventi, checkedB, isJoined, isEdit, nextId, prevId } = this.state
    if (!eventi) return <div>Loading...</div>


    return (

      <section className="eventi-details">
        <div className="details-wrapper">

          <div className="intro">
            <img src={require(`../assets/img/${eventi.tags[0]}/${eventi.imgUrl}`)} alt="event-creator" />
            <FormControlLabel
              control={
                <Switch
                  checked={checkedB}
                  onChange={() => this.handleChange("checkedB")}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Hide event"
            />

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
              <div className={isEdit ? 'active' : 'passive'} onClick={() => { this.handleChange('isEdit') }}>EDIT</div>
              <i className="icon far fa-heart beat"></i>
              <div className={isJoined ? 'active' : 'passive'} onClick={() => { this.handleChange('isJoined') }}>JOIN</div>
            </div>
          </div>

          <ul className="details-info">
            <li><i className="icon fas fa-warehouse"></i>{eventi.capacity ? eventi.capacity : 'unlimited'} capacity</li>
            <li><i className="icon far fa-calendar-alt"></i>{this.getDate()}</li>
            <li><i className="icon far fa-hourglass"></i>{eventi.duration} hrs</li>
            <li><i className="icon fas fa-map-marker-alt"></i>Online event</li>
            <li><i className="icon fas fa-globe-americas"></i>English</li>
            <li> <i className="icon fas fa-user-friends"></i>{eventi.participants.length * 100} {this.calcParticipants()}</li>
          </ul>

          <Comments comments={eventi.comments} />

          <div className="next-prev">
            <div className="btn prev"><Link to={`/${eventi.tags[0]}/${prevId}`}><i className="fas fa-arrow-circle-left"></i></Link></div>
            <div className="btn next"><Link to={`/${eventi.tags[0]}/${nextId}`}><i className="fas fa-arrow-circle-right"></i></Link></div>
          </div>

        </div>

        {isJoined && <Chat toggleChat={this.handleChange} />}
      </section>

    )
  }
}

const mapStateToProps = state => {
  return {
    // eventis: state.eventiReducer.eventis
    // loggedInUser: state.userReducer.loggedInUser
  };
};

const mapDispatchToProps = {
  // updateEvent,
  // updateUser,
  // removeEventi
  // loadEventis
}

export const EventiDetails = connect(mapStateToProps, mapDispatchToProps)(_EventiDetails)






