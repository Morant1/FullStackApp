import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

// import { GlobalSearch } from './GlobalSearch';
// import { logout } from '../store/actions/userActions';
// import { UserNotifications } from '../cmps/UserNotifications'

export class _Navbar extends Component {

    state = {
        isUserProfile: false,
        isNotify: false
    }

    onUser = () => {
        let { isUserProfile } = this.state;
        isUserProfile = !isUserProfile
        this.setState({ isUserProfile })
    }

    onLogout = () => {
        this.props.logout();
        this.onUser();
    }

    onNotification = () => {
        const isNotify = !this.state.isNotify
        this.setState({ isNotify })
    }
    getStyle = () => {
        return { 'display': this.state.isNotify ? 'flex' : 'none' }
    }

    componentDidMount() {
        var navbar = document.querySelector('nav')

        window.onscroll = function () {
            if (window.pageYOffset > 20) {
                navbar.classList.add('scrolled')
            } else {
                navbar.classList.remove('scrolled')
            }
        }

        // const menuBtn = document.querySelector('.menu-btn');
        // let menuOpen = false;
        // menuBtn.addEventListener('click', () => {
        //     if (!menuOpen) {
        //         menuBtn.classList.add('open');
        //         menuOpen = true;
        //     } else {
        //         menuBtn.classList.remove('open');
        //         menuOpen = false;
        //     }
        // });

        const toggleButton = document.querySelector('.toggle-button')
        const navbarLinks = document.getElementsByClassName('navbar-links')[0]

        toggleButton.onclick = function (e) {
            e.preventDefault();
            navbarLinks.classList.toggle('active')
            toggleButton.classList.toggle('active')
          }

    }

    componentWillUnmount() {

    }


    render() {
        return (




            <nav className="navbar hamburger">
                <div className="brand-title">
                    <img className="img-logo" src={require('../assets/img/logo2.png')} alt="logo"></img>
                EvenTribe
                </div>
                <a href="#" className="toggle-button">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className="navbar-links">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </nav>


        )
    }
}

const mapStateToProps = state => {
    return {
        // loggedInUser: state.userReducer.loggedInUser
    };
};

const mapDispatchToProps = {
    // logout
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Navbar))

