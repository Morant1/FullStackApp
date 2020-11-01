import React from 'react'
import { withRouter, Link } from 'react-router-dom'
function _Header() {
    return (
        <header className="header-container" style={{backgroundImage:`url(${require("../assets/img/background5.jpg")})`}}>
            <h1 className="main-title"><span className="start-title">EvenTribe<span className="dote">.</span></span> an online event platform</h1>
            <div className="slider-container">
                <div id="slider">
                    <div className="slider-msg">
                        <h1>What is all about</h1>
                        <p>attend virtual events from home any time</p>
                        <Link to={'/all'}>See More</Link>
                    </div>
                    <div className="slider-msg">
                        <h1>Choose your event</h1>
                        <p>from the tennis field to the white house, we have a variety of events
                    </p>
                    <Link to={'/all'}>See More</Link>
                    </div>
                    <div className="slider-msg">
                        <h1>Join and recieve a link</h1>
                        <p>All events are online and the link is given to you when you subscribe</p>
                        <Link to={'/all'}>See More</Link>
                    </div>
                    <div className="slider-msg">
                        <h1>Create your influencial event</h1>
                        <p>spread your knowlowadge with others and bring women together</p>
                        <Link to={'/all'}>See More</Link>
                    </div>
                </div>

            </div>
        </header>
    )
}

export const Header = withRouter(_Header)