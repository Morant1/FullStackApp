import React from 'react';
import { withRouter } from "react-router";

import { Avatar } from '@material-ui/core';

function _EventiPreview({ eventi, location }) {
    return (
        <li className={`eventi-preview card ${location.pathname === '/' ? 'preview' : ''}`}>
            <div className="img-area">
                <img className="preview-img" alt="eventi-img" src={require(`../assets/img/${eventi.tags[0]}/${eventi.imgUrl}`)} />
                <div className="wrapper">
                    <div className="hashtag"><i className="fas fa-hashtag"></i>{eventi.tags[0]}</div>
                </div>
            </div>
            <div className="preview-info">
                <div className="preview-title">{eventi.title}</div>
                <div className="time-container">
                    <span className="calender far fa-calendar-alt fa-sm"></span><span className="preview-time"> {new Date(eventi.startsAt).toLocaleDateString('he-IL')}</span>
                    <span className="clock far fa-clock fa-sm"></span><span className="preview-time"> {new Date(eventi.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="event-creator-section flex align-center">
                    <Avatar className="avatar">{eventi.createdBy.username[0].toUpperCase()}</Avatar>
                    <span className="creator">{eventi.createdBy.username.toUpperCase()}</span>
                </div>
            </div>
        </li>
    )
}

export const EventiPreview = withRouter(_EventiPreview)



