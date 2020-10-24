import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import { withRouter } from "react-router";

class _EventiPreview extends Component {



    render() {
        const { eventi, currTag, loggedInUser } = this.props;
        const user = loggedInUser ? eventi.participants.find(participant => participant._id === loggedInUser._id): '';
        const img = require(`../assets/img/${eventi.tags[1]}.jpg`);
        return (
            <li className={`eventi-preview card ${this.props.location.pathname==='/'? 'preview':''}`}>
                <Link to={`/${currTag}/${eventi._id}`}>
                    <div className="img-area">
                        <button className={`attend-btn ${user?'joined-user': ''}`}>
                            {user ?
                         <span className="joined">You're Going!</span> : <span> Join The fun!</span>}</button>
                        <img className="preview-img" alt="event-01" src={img}></img>
                        <span className="preview-rank"><div className="star fas fa-star"></div><span className="main-rank">{eventi.rank}</span>(40) · {eventi.location.country}</span>
                    </div>
                    <div className="preview-info">
                    <div className="preview-title">{eventi.title.length > 40 ? eventi.title.substr(0,40)+'...': eventi.title}</div>
                    <div className="preview-subtitle">{eventi.subtitle ? eventi.subtitle :''}</div>
                    <div className="time-container">
                        <span className="calender far fa-calendar-alt fa-sm"></span><span className="preview-time"> {new Date(eventi.startsAt).toLocaleDateString('he-IL')}</span>
                        <span className="clock far fa-clock fa-sm"></span><span className="preview-time"> {new Date(eventi.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                        <div className="event-creator-section flex align-center">
                            <Avatar className="avatar">{eventi.createdBy.username[0].toUpperCase()}</Avatar>
                            <span className="creator">{eventi.createdBy.username.toUpperCase()}</span>
                        </div>
                    </div>
                </Link>
            </li>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    };
};


export const EventiPreview = connect(mapStateToProps)(withRouter(_EventiPreview))

