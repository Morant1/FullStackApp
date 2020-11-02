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
        this.setState({ isActive: !this.state.isActive })
    }
    toggleNotification = (ev) => {
        ev.stopPropagation();
        this.setState({ isNotify: !this.state.isNotify })

    }


    render() {
        const { isActive, isNotify } = this.state;
        const { loggedInUser } = this.props
        return (
            <nav ref={this.navRef} className="navbar hamburger">
                <div className="logo">
                <Link to="/">
                    <div className="brand-title">
                        <img className="img-logo" src={require('../assets/img/logo2.png')} alt="logo"></img>
                EvenTribe
                </div>
                </Link>
                  {loggedInUser && <div className="user"> <Avatar className="avatar">{loggedInUser.username[0].toUpperCase()}</Avatar>{loggedInUser.isGuest ? loggedInUser.username.slice(0,5): loggedInUser.username}</div>}
                  <div onClick={this.toggleNotification}><i className="icon bell fas fa-bell"></i></div>
                </div>
                <a onClick={this.toggleBtn} className={`toggle-button ${isActive ? 'active' : ''}`}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className={`navbar-links ${isActive ? 'active' : ''}`}>
                    <ul>
                        <li onClick={this.toggleBtn}><Link to="/"><i className="icon fas fa-home"></i>Home</Link></li>
                        <li onClick={this.toggleBtn}><Link to="/login"><i className="icon fas fa-user"></i>Sign up</Link></li>
                        <li><a className="line">|</a></li>
                        <li onClick={this.toggleBtn}><Link to="/edit"><i className="icon fas fa-plus-circle"></i>Create</Link></li>
                        <li onClick={this.props.logout}><a><i className="icon fas fa-sign-out-alt"></i></a></li>
                    </ul>
                </div>
                <div className={`notification-container ${isNotify ? 'visible' : ''}`}>
                            <UserNotifications user={loggedInUser} />
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


