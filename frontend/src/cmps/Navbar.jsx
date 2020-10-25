import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";


export class _Navbar extends Component {


    componentDidMount() {
        var navbar = document.querySelector('nav')

        window.onscroll = function () {
            if (window.pageYOffset > 20) {
                navbar.classList.add('scrolled')
            } else {
                navbar.classList.remove('scrolled')
            }
        }

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
                <Link to="/">
                <div className="brand-title">
                    <img className="img-logo" src={require('../assets/img/logo2.png')} alt="logo"></img>
                EvenTribe
                </div>
                </Link>
                <a href="#" className="toggle-button">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className="navbar-links">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#">Sign up</a></li>
                        <li><a><i className="fas fa-bell"></i>  Activity</a></li>
                    </ul>
                </div>
            </nav>


        )
    }
}

export const Navbar = withRouter(_Navbar)

