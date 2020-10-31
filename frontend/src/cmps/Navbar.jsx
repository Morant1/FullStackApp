import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Avatar } from '@material-ui/core';

import { logout } from '../store/actions/userActions';
import { UserNotifications } from './UserNotifications';



export class _Navbar extends Component {

    state = {
        isActive: false,
        isNotify: false
    }

    navRef = React.createRef();

    componentDidMount() {
        window.onscroll = () => {
            if (window.pageYOffset > 20) {
                this.navRef.current.classList.add('scrolled')
            } else {
                this.navRef.current.classList.remove('scrolled')
            }
        }
    }

    toggleBtn = () => {
        this.setState({ isActive: !this.state.isActive }, () => { console.log("isavtive") })
    }
    toggleNotification = (ev) => {
        ev.stopPropagation();
        this.setState({ isNotify: !this.state.isNotify }, () => { console.log("isnotify") })

    }


    render() {
        const { isActive, isNotify } = this.state;
        const { loggedInUser } = this.props
        return (
            <nav ref={this.navRef} className="navbar hamburger">
                <Link to="/">
                    <div className="brand-title">
                        <img className="img-logo" src={require('../assets/img/logo2.png')} alt="logo"></img>
                EvenTribe
                </div>
                </Link>
                <a onClick={this.toggleBtn} className={`toggle-button ${isActive ? 'active' : ''}`}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className={`navbar-links ${isActive ? 'active' : ''}`}>
                    <ul>
                        <li onClick={this.toggleBtn}><Link to="/">Home</Link></li>
                        {loggedInUser && <li><a><Avatar>{loggedInUser.username[0].toUpperCase()}</Avatar>{loggedInUser.username}</a></li>}
                        <li onClick={this.toggleBtn}><Link to="/login">Sign up</Link></li>
                        <li onClick={this.props.logout}><a>Logout</a></li>
                        <li onClick={this.toggleBtn}><a>Create</a></li>
                        <li><Link to="/like"><i className="far fa-heart"></i></Link></li>
                        <li onClick={this.toggleNotification}><a><i className="fas fa-bell"></i></a></li>
                        {isNotify && <div className={`notification-container ${isNotify ? 'visible' : ''}`}>
                            <UserNotifications user={loggedInUser} />
                        </div>}
                    </ul>
                </div>
            </nav>


        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    };
};

const mapDispatchToProps = {
    logout
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Navbar))


