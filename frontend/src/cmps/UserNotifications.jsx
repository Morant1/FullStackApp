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
        if (!msgs) return <div>Loading...</div>
        return (

            <ul className="notification-list">
                {msgs.length ? msgs.map((msg, index) => {
                    return (
                        <li key={index} className="notification-preview">
                            <div className="avatar">
                                <Avatar>{this.props.user.username[0].toUpperCase()}</Avatar>
                            </div>
                            <div className="msg-body">
                                <div className="msg-notifiction">{msg}</div>
                                <div className="notification-date">{new Date(Date.now()).toLocaleDateString("en-US")}</div>
                            </div>
                        </li>
                    )
                }) :
                    <li className="notification-preview">
                        <div className="avatar">
                        {this.props.user && <Avatar>{this.props.user.username[0].toUpperCase()}</Avatar>}
                        </div>
                        <div className="msg-body">
                            <div className="notification-msg">No notificatons yet</div>
                            <div className="notification-date">{new Date(Date.now()).toLocaleDateString("en-US")}</div>
                        </div>
                    </li>
                }

            </ul>

        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    };
};


export const UserNotifications = connect(mapStateToProps)(_UserNotifications)

