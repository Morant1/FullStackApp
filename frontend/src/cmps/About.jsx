import React from 'react'

export function About() {
    return (
        <div className="about-container">
            <div className="wrapper">
            <h1>Our Motto<span>.</span></h1>
            <div className="about">
            <i className="fas fa-gift"></i>
            <h2>Each day is another oppurtunity</h2>
                <p>Our women community is here to give you knowledge</p>
            </div>
            <div className="about">
            <i className="fas fa-street-view"></i>
            <h2>Be part of our tribe</h2>
            <p>Create your own part by adding your own events</p>
            </div>
            <div className="about">
            <i className="fas fa-user-ninja"></i>
            <h2>Share your feelings like a warrior</h2>
            <p>Let us know your thoughts at evenTribe@gmail.com</p>
            </div>
            </div>
        </div>
    )
}
