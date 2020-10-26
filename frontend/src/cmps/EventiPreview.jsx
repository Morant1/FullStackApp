import React from 'react';
import { withRouter } from "react-router";

import { Avatar } from '@material-ui/core';

function _EventiPreview({ eventi, location }) {

    const getTime = () => {
        return new Date(eventi.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const getDate = () => {
        return new Date(eventi.startsAt).toLocaleDateString('he-IL')
    }

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
                <div className="icon-container">
                    <span className="calender far fa-calendar-alt fa-sm"></span><span className="icon-text">{getDate()}</span>
                    <span className="clock far fa-clock fa-sm"></span><span className="icon-text time"> {getTime()}</span>
                    <span className="far fa-user"></span><span className="icon-text">{eventi.participants.length*100}</span>
                </div>
                <div className="event-creator-section">
                    <Avatar className="avatar">{eventi.createdBy.username[0].toUpperCase()}</Avatar>
                    <span className="creator">{eventi.createdBy.username.toUpperCase()}</span>
                </div>
            </div>
        </li>
    )
}

export const EventiPreview = withRouter(_EventiPreview)



