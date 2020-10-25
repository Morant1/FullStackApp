import React from 'react'

export function Header() {
    return (
        <header className="header-container">
            <h1 className="main-title"><span className="start-title">EvenTribe<span className="dote">.</span></span> an online event platform</h1>
            <div className="slider-container">
                <div id="slider">
                    <div className="slider-msg">
                        <h1>What is all about</h1>
                        <p>attend virtual events from home any time</p>
                        <a href="">Learn More</a>
                    </div>
                    <div className="slider-msg">
                        <h1>Choose your event</h1>
                        <p>from the tennis field to the white house, we have a variety of events
                    </p>
                        <a href="">Learn More</a>
                    </div>
                    <div className="slider-msg">
                        <h1>Join and recieve a link</h1>
                        <p>All events are online and the link is sent to you via email 24hrs before</p>
                        <a href="">Learn More</a>
                    </div>
                    <div className="slider-msg">
                        <h1>Create your own influencial event</h1>
                        <p>spread your knowlowadge with others and bring women together</p>
                        <a href="">Learn More</a>
                    </div>
                </div>

            </div>
        </header>
    )
}
