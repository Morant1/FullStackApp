import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { UserNotifications } from './UserNotifications';



export class _Navbar extends Component {

    state = {
        isActive: false,
        isNotify:false
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
        this.setState({isActive: !this.state.isActive})
    }
    toggleNotification = () => {
        this.setState({isNotify: !this.state.isNotify},()=>{console.log(this.state.isNotify)})
    }


    render() {
        const {isActive,isNotify} = this.state;
        return (
            <nav ref={this.navRef} className="navbar hamburger">
                <Link to="/">
                <div className="brand-title">
                    <img className="img-logo" src={require('../assets/img/logo2.png')} alt="logo"></img>
                EvenTribe
                </div>
                </Link>
                <a onClick={this.toggleBtn} className={`toggle-button ${isActive? 'active' : ''}`}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className={`navbar-links ${isActive? 'active' : ''}`}>
                    <ul>
                        <li onClick={this.toggleBtn}><Link to="/">Home</Link></li>
                        <li onClick={this.toggleBtn}><Link to="/login">Sign up</Link></li>
                        <li onClick={this.toggleBtn}><a>Create</a></li>
                        <li onClick={this.toggleNotification}><a><i className="fas fa-bell"></i></a></li>
                        {isNotify && <UserNotifications/>} 
                    </ul>
                </div>
            </nav>


        )
    }
}

export const Navbar = withRouter(_Navbar)

