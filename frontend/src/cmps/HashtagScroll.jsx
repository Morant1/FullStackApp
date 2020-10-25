import React, { Component } from 'react'

export class HashtagScroll extends Component {

    componentDidMount() {
}
render() {
    const arr = ["entrepreneurship", "walmart",
    "environment",
    "david Koch", "koch Industries", "donation",
    "steve jobs", "apple", "education",
    "holywood", "music",
    "wonder woman", "actress", "reality",
    "sport", "tennis", "soccer",
    "politics", "royality", "British royals", "president"];
    return (
        <section className="stripe">
        <div className="hashtag-scroll-container">
            <ul className="hashtag-list">
                {arr.map(hashtag=><li key={hashtag}><i className="fas fa-hashtag"></i>{hashtag}</li>)}
            </ul>



            </div>
            </section>
        )
    }
}
