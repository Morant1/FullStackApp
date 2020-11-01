import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


import { Comments } from '../cmps/Comments'
import { updateEventi } from '../store/actions/eventiActions'
import { Avatar } from '@material-ui/core';
import { Chat } from '../cmps/Chat'
import { eventiService } from '../services/eventiService';
import { BusService } from '../services/event-bus-service'
import { utils } from '../services/utils';

class _EventiDetails extends Component {
  state = {
    eventi: null,
    checkedB: false,
    isChat: false,
    nextId: null,
    prevId: null
  }

  componentDidMount() {
    console.log("mounted")
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
    console.log(eventi)
    this.setState({ eventi }, () => { this.getPrevNextId() });

    BusService.emit('notify', { msg: `You watched ${eventi.createdBy.username}'s event details` })

  }

  isGoing = () => {
    const participant = this.state.eventi.participants.find(participant => participant._id === this.props.loggedInUser._id);
    return participant;
  }

  addParticipant = () => {
    const participant = this.isGoing();
    let eventi = { ...this.state.eventi };

    if (!participant) {
      this.setState({isChat:true})
      eventi.participants = [this.props.loggedInUser, ...eventi.participants]
      BusService.emit('notify', { msg: `You are going to ${eventi.createdBy.username} event` })
    } else {
      this.setState({isChat:false})
      eventi.participants = eventi.participants.filter(participant => {
        return participant._id !== this.props.loggedInUser._id
      })

      BusService.emit('notify', { msg: `You are not going to ${eventi.createdBy.username} event anymore` })
    }
    this.props.updateEventi(eventi)
    this.setState({ eventi })


  }


  getDate = () => {
    const { eventi } = this.state;
    const time = new Date(eventi.startsAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const date = new Date(eventi.startsAt).toLocaleDateString('he-IL')
    return `${date} ,${time}`
  }

  calcParticipants = () => {
    const { eventi } = this.state;
    if (!eventi.capacity) return 'participants';
    return `(${eventi.capacity - eventi.participants.length} available)`;
  }

  getPrevNextId = async () => {
    const { prevId, nextId } = await eventiService.getPrevNext(this.state.eventi);
    this.setState({ prevId, nextId })
  }


  handleChange = (name) => {
    this.setState({ [name]: !this.state[name] },()=>{console.log(this.state.isChat)});
  }

  addComment = (txt) => {
    const { loggedInUser } = this.props;
    const eventi = { ...this.state.eventi }
    const comment = {
      id: utils.makeId(),
      createdAt: Date.now(),
      createdBy: { _id: loggedInUser._id, username: loggedInUser.username },
      txt
    }

    eventi.comments = [...eventi.comments, comment];
    this.props.updateEventi(eventi);
    this.setState({ eventi })
    BusService.emit('notify', { msg: `You left a comment at ${eventi.createdBy.username} event`})
  }
  removeComment = (commentId) => {
    const eventi = { ...this.state.eventi }
    eventi.comments = eventi.comments.filter(comment => {
      return comment.id !== commentId
    });

    this.props.updateEventi(eventi);
    this.setState({ eventi })
  }

  render() {
    const { eventi, checkedB, nextId, prevId, isChat} = this.state
    if (!eventi) return <div>Loading...</div>


    return (

      <section className="eventi-details">

        <div className="details-wrapper">
          <div className="navigation"><Link to={`/`}>Home</Link><span>&gt;</span><Link to={`/${eventi.category}`}>{eventi.category}</Link></div>

          <div className="intro">
            <img className={this.isGoing() && 'round'} src={eventi.imgUrl} alt="event-creator" />
            <FormControlLabel
              control={
                <Switch
                  checked={checkedB}
                  onChange={() => this.handleChange("checkedB")}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Effect"
            />

            <div className="intro-details">
              <div className="creator">
                <Avatar className="avatar">{eventi.createdBy.username[0].toUpperCase()}</Avatar>
                <h3>{eventi.createdBy.username.toUpperCase()}</h3>
              </div>
              <h1>{eventi.title}</h1>
              <p>{eventi.description}</p>
              {eventi.tags && <ul className="tags">
                {eventi.tags.map((tag, idx) => <li key={`${tag}-${idx}`}>{tag}</li>)}
              </ul>}
            </div>

            <div className="actions">
              <div className='passive'><Link to={`/edit/${eventi._id}`}>Edit</Link></div>
              <div className={this.isGoing() ? 'active' : 'passive'} onClick={this.addParticipant}>JOIN</div>
            </div>
          </div>

          <ul className="details-info">
            <li><i className="icon fas fa-warehouse"></i>{eventi.capacity ? eventi.capacity : 'unlimited'} capacity</li>
            <li><i className="icon far fa-calendar-alt"></i>{this.getDate()}</li>
            <li><i className="icon far fa-hourglass"></i>{eventi.duration} hrs</li>
            <li><i className="icon fas fa-map-marker-alt"></i>Online event</li>
            <li><i className="icon fas fa-globe-americas"></i>English</li>
            <li> <i className="icon fas fa-user-friends"></i>{eventi.participants.length} {this.calcParticipants()}</li>
            {this.isGoing() && <li><i className="icon zoom fas fa-video"></i><a href='http://www.zoom.com' target="_blank">Event link</a></li>}
          </ul>

          {eventi.participants.length ?

            <ul className="participants">
              <div className="title">Attending</div>
              {eventi.participants.map(participant => <li key={participant._id}><Avatar className="avatar">{participant.username[0].toUpperCase()}</Avatar>{participant.username}</li>)
              }
            </ul>:''}

          <Comments user={this.props.loggedInUser} removeComment={this.removeComment} addComment={this.addComment} comments={eventi.comments} />
        {this.isGoing() && <i onClick={()=>{this.handleChange("isChat")}} className="chat far fa-comment-dots"></i>}

          <div className="next-prev">
            <div className="btn prev"><Link to={`/${eventi.category}/${prevId}`}><i className="fas fa-arrow-circle-left"></i></Link></div>
            <div className="btn next"><Link to={`/${eventi.category}/${nextId}`}><i className="fas fa-arrow-circle-right"></i></Link></div>
          </div>

        </div>

        {isChat && <Chat toggleChat={this.handleChange} user={this.props.loggedInUser} eventi={eventi} />}

        {checkedB && <div id="background-wrap">
    <div className="bubble x1"></div>
    <div className="bubble x2"></div>
    <div className="bubble x3"></div>
    <div className="bubble x4"></div>
    <div className="bubble x5"></div>
    <div className="bubble x6"></div>
    <div className="bubble x7"></div>
    <div className="bubble x8"></div>
    <div className="bubble x9"></div>
    <div className="bubble x10"></div>
</div>}
      </section>

    )
  }
}

const mapStateToProps = state => {
  return {
    // eventis: state.eventiReducer.eventis
    loggedInUser: state.userReducer.loggedInUser
  };
};

const mapDispatchToProps = {
  updateEventi,
  // updateUser,
  // removeEventi
  // loadEventis
}

export const EventiDetails = connect(mapStateToProps, mapDispatchToProps)(_EventiDetails)






