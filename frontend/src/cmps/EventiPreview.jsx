import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import { Avatar } from '@material-ui/core';
import { Component } from 'react';

class _EventiPreview extends Component {

    getTime = () => {
        return new Date(this.props.eventi.startsAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    getDate = () => {
        return new Date(this.props.eventi.startsAt).toLocaleDateString('he-IL')
    }

    render() {
        const { eventi, location,loggedInUser } = this.props;
        const user = loggedInUser && eventi.participants.find(participant => participant._id === loggedInUser._id);
        return (
            <li className={`eventi-preview card ${location.pathname === '/' ? 'preview' : ''}`}>
                <Link to={`/${eventi.tags[0]}/${eventi._id}`}>
                    <div className="img-area">
                        <i className="far fa-heart beat"></i>
                        {user && <i className="joined far fa-calendar-check"></i>}
                        <img className="preview-img" alt="eventi-img" src={require(`../assets/img/${eventi.tags[0]}/${eventi.imgUrl}`)} />
                        <div className="wrapper">
                            <div className="hashtag"><i className="fas fa-hashtag"></i>{eventi.tags[0]}</div>
                        </div>
                    </div>
                    <div className="preview-info">
                        <div className="preview-title">{eventi.title}</div>
                        <div className="icon-container">
                            <span className="calender far fa-calendar-alt fa-sm"></span><span className="icon-text">{this.getDate()}</span>
                            <span className="clock far fa-clock fa-sm"></span><span className="icon-text time"> {this.getTime()}</span>
                            <span className="far fa-user"></span><span className="icon-text">{eventi.participants.length * 100}</span>
                        </div>
                        <div className="event-creator-section">
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

