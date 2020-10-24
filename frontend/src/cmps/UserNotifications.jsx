import React, { Component } from 'react'
import { BusService } from '../services/event-bus-service';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';

export class _UserNotifications extends Component {
    state = {
        msgs: []
    }

    unsubscribe;
    componentDidMount() {
        this.unsubscribe = BusService.on('notify', (data) => {
            this.setState({ msgs: [...this.state.msgs, data.msg] })
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const { msgs } = this.state
        if (!msgs) return 'Loading';
        return (
            <div className="notification-container">
            
                <ul className="notification-list flex">
                    {msgs.map((msg, index) => {
                        return (
                            <li key={index} className="notification-preview flex justify-center align-center">
                                <div className="avatar-section">
                                    <div className="user-preview">
                                    <Avatar>{this.props.loggedInUser.username[0].toUpperCase()}</Avatar>
                                    </div>
                                </div>
                                <div className="msg-body">
                                    <span className="msg">{msg}</span>
                                    <div className="notification-date">{new Date(Date.now()).toLocaleDateString("en-US")}
                                    </div>
                                </div>
                            </li>
                        )
                    })}

                </ul>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    };
};


export const UserNotifications = connect(mapStateToProps)(_UserNotifications)

