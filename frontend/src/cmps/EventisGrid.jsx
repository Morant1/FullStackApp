import React, { Component } from 'react'
import { withRouter } from 'react-router';

export class _EventisGrid extends Component {

    state = {
        grid: ['buisness','holywood','politics','sports']
    }
    
    redirectClick = (tag) => {
        this.props.history.push(`/${tag}`)
    }

    capitalizeBox = (box) => {
        return box.charAt(0).toUpperCase() + box.slice(1);
    }


    render() {
        const {grid} = this.state;
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
                {grid.map(box=> (
                <div className="flip-card" key={box}>
                        <div className="flip-card-inner" onClick={(ev)=>{this.redirectClick(box)}}> 
                            <div className="flip-card-front"
                                style={{ backgroundImage: `url(${require(`../assets/img/${box}-main.jpg`)})` }}>
                                <h1 className="title">{this.capitalizeBox(box)}<span className="dote">.</span></h1>
                            </div>
                            <div className="flip-card-back">
                                <p>See More</p>
                            </div>
                        </div>
                    </div>
                ))}
                </section>
            </React.Fragment>
        )
    }
}

export const EventisGrid = withRouter(_EventisGrid)









