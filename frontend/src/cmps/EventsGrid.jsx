import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export class EventsGrid extends Component {

    
    componentDidMount() {

    }
    redirectClick = (tag) => {
        this.props.history.push(`/${tag}`)
    }
    render() {
        return (
            <React.Fragment>
                <section className="sub-nav">
                    <ul>
                        <li><a>All events</a></li>
                        <li><a>Your events</a></li>
                        <li><a>Today</a></li>
                        <li><a>This week</a></li>
                    </ul>
                </section>

                <section className="events-grid">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front"
                                style={{ backgroundImage: `url(${require("../assets/img/buisness-main.jpeg")})` }}>
                                <h1 className="title">Buisness<span className="dote">.</span></h1>
                            </div>
                            <div className="flip-card-back">
                                <p>See More</p>
                            </div>
                        </div>
                    </div>

                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front"
                                style={{ backgroundImage: `url(${require("../assets/img/holywood-main.jpg")})` }}>
                                <h1 className="title">Holywood<span className="dote">.</span></h1>
                            </div>
                            <div className="flip-card-back">
                                <p>See More</p>
                            </div>
                        </div>
                    </div>

                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front"
                                style={{ backgroundImage: `url(${require("../assets/img/politics-main.jpg")})` }}>
                                <h1 className="title">Politics<span className="dote">.</span></h1>
                            </div>
                            <div className="flip-card-back">
                                <p>See More</p>
                            </div>
                        </div>
                    </div>

                    <div className="flip-card ">
                        <div className="flip-card-inner">
                            <div className="flip-card-front"
                                style={{ backgroundImage: `url(${require("../assets/img/sport-main.jpg")})` }}>
                                <h1 className="title">Sports<span className="dote">.</span></h1>
                            </div>
                            <div className="flip-card-back">
                                <p>See More</p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

// export const EventsGrid = withRouter(_EventsGrid)









// {
//     events.map(eventi => <div className="event-card" onClick={(ev) => { this.redirectClick(`${tag}`) }}>
//     <span className="tag-sport">Sport</span>
//     <img src={require(`../assets/img/${tag}.jpg`)}></img>

//     </div>)
// }