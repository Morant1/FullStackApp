import React from 'react'

export function About() {
    return (
        <div className="about-container">
            <div className="wrapper">
            <h1>About evenTribe<span>.</span></h1>
            <div className="about">
            <i className="fas fa-gift"></i>
            <h2>EvenTribe is an online events platform</h2>
                <p>Here you can create engaging virtual events that connect women around the globe.</p>
            </div>
            <div className="about">
            <i className="fas fa-street-view"></i>
            <h2>We believe in women tribe</h2>
            <p>Here you can gain knowledge from the most influenical women in our days.</p>
            </div>
            <div className="about">
            <i className="fas fa-user-ninja"></i>
            <h2>Connecting is our motto</h2>
            <p>Let us know your thoughts at evenTribe@gmail.com</p>
            </div>
            </div>
        </div>
    )
}
